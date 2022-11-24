import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { getPlayerProfile } from "../../features/Game/ProfileSlice"
import "./GmControl.css"
export default function GmControl({client, gameId} : {client : any, gameId : any}) {
  const dispatch = useAppDispatch()
  const mapStatus = useAppSelector((state:RootState) => state.game.mapStatus)
  const py1Code = useAppSelector((state:RootState) => state.room.py1Code)
  const py2Code = useAppSelector((state:RootState) => state.room.py2Code)
  const py3Code = useAppSelector((state:RootState) => state.room.py3Code)
  const py4Code = useAppSelector((state:RootState) => state.room.py4Code)
  const py5Code = useAppSelector((state:RootState) => state.room.py5Code)
  //* 현재 전투 중인 몬스터 정보
  const monsterInfo = useAppSelector((state) => state.session.monster)

  //* 스탯 포인트 부여
  const setStatPoint = () => {
    //* 한번 부여할 때마다 2점씩 준다
    const statData = {
      statPoint : 2
    }
    client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(statData), {id : gameId}); //* 이벤트 로그
  }

  const formik = useFormik({
    initialValues: {monsterId: 0, monsterNum: 0},
    // validationSchema: Yup.object({
    //   userId: Yup.number()
    //   .required('Required'),
    //   userPw: Yup.number()
    //   .required('Required'),
    // }),
    onSubmit: (data) => {
      // 여기에서 submit 보내시면 돼요
      // 테스트 출력
      // console.log("지역 번호:", mapStatus);

      //* 몬스터 등장 숫자 - 랜덤값
      // 테스트 출력
      // console.log("몬스터 아이디:", data.monsterId);
      // console.log("입력받은 타입:", typeof data.monsterId);
      
      let monsterId = 0;

      //? 맨 첫번째 몬스터 같은 경우 아이디가 0으로 나타나서 1로 작성
      //? 그 다음 몬스터부터는 아이디 값을 그대로 부여
      //? 첫 번째 몬스터 아이디만 숫자로 뜨고 나머지 2, 3, 4는 문자열로 나타남
      if (data.monsterId === 0) {
        monsterId = 1
      } else if (typeof(data.monsterId) === 'string') {
        monsterId = parseInt(data.monsterId);
      }

      let randomNum = monsterId === 1 ? (Math.floor(Math.random() * (4 - 1 + 1)) + 1) 
                    : monsterId === 2 ? (Math.floor(Math.random() * (3 - 1 + 1)) + 1)
                    : monsterId === 3 ? (Math.floor(Math.random() * (2 - 1 + 1)) + 1) 
                    : 1
      // 테스트 출력
      // console.log("랜덤 숫자:",randomNum);
      
      data.monsterNum = randomNum;

      const monsterData = {
        mapArea : mapStatus, // 지역 번호
        monsterId : monsterId, // 몬스터 아이디
        monsterNum : data.monsterNum // 등장한 몬스터 수
      }

      //* 서버에 메세지 전송
      //? connect를 하고 callback으로 send을 하면 값이 나가지 않음 
      client.send(`/ttrpg/mon/${gameId}/sendSignal`, JSON.stringify(monsterData), {id : gameId}); //* 몬스터 정보
      client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(monsterData), {id : gameId}); //* 이벤트 로그
    }
  })
  const formikTwo = useFormik({
    initialValues: {
      playerUserCode: 1,
      playerSpecies: '',
      playerName: '',
      playerLook: '',
      playerValue: 'good',
      playerWeapon: '',
      playerArmor: '',
      playerHP: 0,
      playerSup1: 99,
      playerSup2: 99,
      playerSup3: 99,
      playerStat1: 0,
      playerStat2: 0,
      playerStat3: 0,
      playerStat4: 0,
      playerStat5: 0,
      playerStat6: 0,
      playerClassName: '',
      playerSkill1: '',
      playerSkill2: '',
      playerSkill3: '',
    
    },
    onSubmit: (item) => {
      console.log('폼 유저코드: '+item.playerUserCode)
      axios({
        method: 'GET',
        url: '/api' + `/player/${item.playerUserCode == 1 ? py1Code: item.playerUserCode == 2? py2Code: item.playerUserCode == 3? py3Code: item.playerUserCode == 4? py4Code: py5Code }`
      })
      .then((res) => {
        console.log(res.data)
        if (item.playerWeapon == '')  {
          formikTwo.values.playerWeapon = res.data.playerWeapon
        }
        if (item.playerArmor == '')  {
          formikTwo.values.playerArmor = res.data.playerArmor
        }
        if (item.playerSup1 == 99) {
          formikTwo.values.playerSup1 = res.data.playerSup1
        }
        if (item.playerSup2 == 99) {
          formikTwo.values.playerSup2 = res.data.playerSup2
        }
        if (item.playerSup3 == 99) {
          formikTwo.values.playerSup3 = res.data.playerSup3
        }
        formikTwo.values.playerUserCode = res.data.playerUserCode
        formikTwo.values.playerSpecies = res.data.playerSpecies
        formikTwo.values.playerName = res.data.playerName
        formikTwo.values.playerLook = res.data.playerLook
        formikTwo.values.playerValue = res.data.playerValue
        formikTwo.values.playerHP = res.data.playerHP
        formikTwo.values.playerStat1 = res.data.playerStat1
        formikTwo.values.playerStat2 = res.data.playerStat2
        formikTwo.values.playerStat3 = res.data.playerStat3
        formikTwo.values.playerStat4 = res.data.playerStat4
        formikTwo.values.playerStat5 = res.data.playerStat5
        formikTwo.values.playerStat6 = res.data.playerStat6
        formikTwo.values.playerClassName = res.data.playerClassName
        formikTwo.values.playerSkill1 = res.data.playerSkill1
        formikTwo.values.playerSkill2 = res.data.playerSkill2
        formikTwo.values.playerSkill3 = res.data.playerSkill3
        console.log(item)
        axios({
          method: 'PUT',
          url: '/api' + `/player/${item.playerUserCode}`,
          data: item
        })
        .then( res => {
          console.log('수정끝')
        })
        .catch(err => {
          console.error(err.response.data)
        })
      })
      .catch(err => {
        console.error(err.response.data)
      })
    }
  })
  const formikThree = useFormik({
    initialValues : {
      userNum: 1,
      userHpChange: 0
    },
    onSubmit: (data) => {
      console.log(data.userNum)
      axios({
        method: 'PUT',
        url: '/api' + `/player/${data.userNum == 1 ? py1Code: data.userNum == 2? py2Code: data.userNum == 3? py3Code: data.userNum == 4? py4Code: py5Code }` +'/hpchange',
        data: {amountOfChangeHp: data.userHpChange}
      })
      .then(res => {
        console.log(res)

        axios({
          method:'GET',
          url: '/api' + `/player/${data.userNum == 1 ? py1Code: data.userNum == 2? py2Code: data.userNum == 3? py3Code: data.userNum == 4? py4Code: py5Code }`
        })
        .then((res) => {
          // 테스트 출력
          // console.log(res.data);
          // console.log(res.data.playerName);
          // console.log("axios이후",monsterInfo.monsterId);
          
          //* 회복하거나 데미지를 받으면 생기는 로그
          let changeCharHp = {
            playerUserCode : data.userNum == 1 ? py1Code: data.userNum == 2? py2Code: data.userNum == 3? py3Code: data.userNum == 4? py4Code: py5Code,
            charName : res.data.playerName,
            mapCode : mapStatus,
            monsterCode : monsterInfo.monsterId,
            userHpChange : data.userHpChange
          }

          client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(changeCharHp), {id : gameId});
        })
      })
    }
  })
  return (
    <div id="gm-control-container">
      <div id="gm-control-title-box">
      <h1>GmControl</h1>
      </div>
      
      {/* 몬스터 출연시키기 */}
      <div className="gm-control-box">
        <p>몬스터 생성</p>
        <form action="" onSubmit={ formik.handleSubmit } className="gm-control-form" >
          <div className="gm-control-label-box my-1">
            <label id='monster-id-label' htmlFor="monsterId">몬스터</label>
            <select id="monsterId" name="monsterId" onChange={formik.handleChange} value={ formik.values.monsterId } className="gm-control-form-child">
              <option value="1">{mapStatus===1 ? "코볼트": mapStatus===2 ? "코카트리스": mapStatus===3? "드워프전사": mapStatus=== 4?"인면충": "미노타우르스"}</option>
              <option value="2">{mapStatus===1 ? "도마뱀인간": mapStatus===2 ? "그리폰": mapStatus===3? "지하인": mapStatus=== 4?"사슬악마": "아볼레스"}</option>
              <option value="3">{mapStatus===1 ? "거대악어": mapStatus===2 ? "오거    ": mapStatus===3? "거미왕": mapStatus=== 4?"가시악마": "용"}</option>
              <option value="4">{mapStatus===1 ? "코아틀": mapStatus===2 ? "혼돈의 즙": mapStatus===3? "오튜그": mapStatus=== 4?"천사": "종말의 용"}</option>
            </select>
          </div>
          
          <button type="submit" className="gm-control-btn my-1">Start Fight</button>
        </form>
      </div>
      {/* 아이템주기 */}
      <div className="gm-control-box">
      <p>아이템 주기</p>
      <form action="" onSubmit={formikTwo.handleSubmit} className="gm-control-form">
        <div className="gm-control-label-box my-1">
          <label id='playerUserCode-label' htmlFor="playerUserCode">Player</label>
          <select name="playerUserCode" onChange={formikTwo.handleChange} value = {formikTwo.values.playerUserCode} id="playerUserCode">
            {py1Code != '' ? <option value={1}>Player1</option>: null}
            {py2Code != '' ? <option value={2}>Player2</option>: null}
            {py3Code != '' ? <option value={3}>Player3</option>: null}
            {py4Code != '' ? <option value={4}>Player4</option>: null}
            {py5Code != '' ? <option value={5}>Player5</option>: null}
          </select>
        </div>
        <div className="gm-control-label-box my-1">
          <label id='playerWeapon-label' htmlFor="playerWeapon">Weapon</label>
          <input type="text" name="playerWeapon" onChange={formikTwo.handleChange} value= {formikTwo.values.playerWeapon} className="gm-control-form-child"/>
        </div>
        <div className="gm-control-label-box my-1">
          <label id='playerArmor-label' htmlFor="playerArmor">Armor</label>
          <input type="text" name="playerArmor" onChange={formikTwo.handleChange} value= {formikTwo.values.playerArmor} className="gm-control-form-child"/>
        </div>
        
        <div className="gm-control-label-box my-1">
          <label id='playerSup1-label' htmlFor="playerSup1">Potion</label>
          <select name="playerSup1" onChange={formikTwo.handleChange} value = {formikTwo.values.playerSup1} id="playerSup1" className="gm-control-form-child">
          <option value={99}>None</option>  
            <option value={1}>Lv1</option>
            <option value={2}>Lv2</option>
            <option value={3}>Lv3</option>
            <option value={4}>Lv4</option>
            <option value={5}>Lv5</option>
            <option value={6}>Lv6</option>    
              
          </select>
        </div>
        
        <div className="gm-control-label-box my-1">
          <label id='playerSup2-label' htmlFor="playerSup2">Antidote</label>
          <select name="playerSup2" onChange={formikTwo.handleChange} value = {formikTwo.values.playerSup2} id="playerSup2" className="gm-control-form-child">
          <option value={99}>None</option> 
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>    
                
          </select>
        </div>
        
        <div className="gm-control-label-box my-1">
        <label id='playerSup3-label' htmlFor="playerSup3">Food</label>
        <select name="playerSup3" onChange={formikTwo.handleChange} value = {formikTwo.values.playerSup3} id="playerSup3" className="gm-control-form-child">
          <option value={99}>None</option>     
          <option value={1}>Lv1</option>
          <option value={2}>Lv2</option>
          <option value={3}>Lv3</option>
          <option value={4}>Lv4</option>
          <option value={5}>Lv5</option>
          <option value={6}>Lv6</option>    
        </select>
        </div>
        
        <button type="submit" className="gm-control-btn my-1">submit</button>
      </form>
      </div>

      {/* hp 관리 */}
      <div className="gm-control-box">
        <p>HP 관리</p>
      <form action="" onSubmit={formikThree.handleSubmit} className="gm-control-form">
      <div className="gm-control-label-box my-1">
      <label id='monster-id-label' htmlFor="userNum">Player</label>
        <select name="userNum" onChange={formikThree.handleChange} value = {1} id="userNum">
          {py1Code != '' ? <option value={1}>Player1</option>: null}
          {py2Code != '' ? <option value={2}>Player2</option>: null}
          {py3Code != '' ? <option value={3}>Player3</option>: null}
          {py4Code != '' ? <option value={4}>Player4</option>: null}
          {py5Code != '' ? <option value={5}>Player5</option>: null}
        </select>
      </div>
      <div className="gm-control-label-box my-1">
        <label htmlFor="userHpChange">HP 회복 / 감소량</label>
        <input id="userHpChange" type="number" className="gm-control-form-child" name="userHpChange" onChange={formikThree.handleChange} value= {formikThree.values.userHpChange}/>
      </div>
        
        <button type="submit" className="my-1 gm-control-btn">submit</button>
      </form>
      </div>

      {/* 스탯 주기 실행 */}
      <div className="gm-control-box" id="stat-point-btn" onClick={() => setStatPoint()}>
        <div className="stat-point-btn" >
          <span>스탯 포인트 부여</span>
        </div>
      </div>
      <div className="empty-5"></div>
    </div>
  )
}