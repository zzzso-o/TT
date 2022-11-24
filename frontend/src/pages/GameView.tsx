import LeftController from "../components/Game/LeftController"
import GamePlay from "../components/Game/GamePlay"
import CameraView from "../components/Game/CameraView"
import MyController from "../components/Game/MyController"
import SetProfile from "../components/Game/SetProfile"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setGameState, setStatPoint, setMapState } from "../features/Game/GameSlice"
import { setMonster } from "../features/Game/MonsterSlice"
import { setStatus } from "../features/Game/LeftSlice"
import { setSignalHistory } from "../features/Game/SignalSlice"
import "./GameView.css"
//* 누군가 죽었을 때 뜨는 모달창
import "../components/GamePlay/SomeoneDead.css"

//* 서버와 메세지 통신을 위해 SOCK JS 및 STOMP JS 도입
//* 참고사이트 : http://jmesnil.net/stomp-websocket/doc/
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import axios from "axios"
import { getRoomInfo, setGmCondition } from "../features/room/RoomSlice"
import SomeoneDead from "../components/GamePlay/SomeoneDead"

//! 배포 서버용
const serverUrl = '/api' + '/signal'; 
//! 로컬 테스트 용
//const serverUrl = 'http://localhost:8080/api' + '/signal';

//* 캐릭터 프로필 완성할 때 로그에 쓰이는 타입
type playerProfileType = {
  userNickname : string,
  playerValue : string,
  playerClassName : string,
  playerName : string
}

//* 보상으로 스탯을 부여할 때 로그에 쓰이는 타입
type statData = {
  statPoint : number
}

//* 캐릭터가 주사위를 굴릴 때 로그에 쓰이는 타입
type diceResult = {
  charName : string,
  diceResult : number,
  diceCnt : number
}

//* 캐릭터의 체력에 변화가 있을 때 로그에 쓰이는 타입
type changeCharHp = {
  playerUserCode : number,
  charName : string,
  mapCode : number,
  monsterCode : number,
  userHpChange : number
}

export default function GameView() {  
  //* 서버에 메세지 통신을 위한 sock js 및 stomp js
  let sockJS = new SockJS(`${serverUrl}/webSocket`); //! /webSocket : 클라이언트에서 서버로 접속하는 엔드포인트
  let client = webstomp.over(sockJS);

  //* url param에서 방 정보를 가져옴
  let {gameId} = useParams()
  const gameState = useSelector((state: RootState) => state.game)
  //* 몬스터 정보 state
  const monsterState = useSelector((state:RootState) => state.session).monster
  //* 이벤트 로그 state
  const signalState = useSelector((state:RootState) => state.session).signal
  const dispatch = useAppDispatch()
  const userCode = useAppSelector((state:RootState) => state.user.userCode)
  const userNickname = localStorage.getItem('user_nickname') as string;

  //* 누군가 죽었을 때 뜨는 모달창
  const [modalOpen, setModalOpen] = useState(false);
  let [additionalLog, setAdditionalLog] = useState('');

  useEffect(() => {
    axios({
      method:'GET',
      url: '/api' + `/roomInfo/${gameId}`
    })
    .then((res) => {
      console.log(res.data)
      console.log(userCode)
      dispatch(getRoomInfo(res.data))
      if (res.data.gmUserCode == userCode) {
        console.log('hihi')
        dispatch(setGmCondition(true))
      }
      else {
        dispatch(setGmCondition(false))
      }
    })
  }, [gameState])

  /**
   * * 몬스터 정보가 들어왔을 때 페이지를 강제로 몬스터 정보 페이지로 바꿔줌
   * @param num 페이지 번호
   */
  const setDivStatus: any = (num:number) => {
    dispatch(setStatus(num))
  }

  useEffect(() => {
    client.connect({id: gameId},()=>{
      client.send(`/ttrpg/event/${gameId}/sendSignal`, userNickname, {id : gameId});
      client.subscribe(`/topic/${gameId}/eventLog`, saveLog, {id : gameId})
    })
  }, [])

  function saveLog(data : any) : any{
    console.log("서버에서 받은 값:", (data.body));

    //* 서버에서 받은 로그 값
    //* 지도 관련된 로그 값
    if (data.body.includes("Start")  
        || data.body.includes("Forest")
        || data.body.includes("Devil")
        || data.body.includes("Cavern")
        || data.body.includes("Mountain")
        || data.body.includes("Swamp")
    ) 
    {
      let areaName = data.body;
      const areaObj = {
        name : areaName
      };
      console.log("지역 이름:",areaName);      
      console.log(typeof areaName);
      

      // const areaStatMap = new Map();
      // areaStatMap.set('0', "Start");
      // areaStatMap.set('1', "Swamp");
      // areaStatMap.set('2', "Forest");
      // areaStatMap.set('3', "Cavern");
      // areaStatMap.set('4', "Devil");
      // areaStatMap.set('5', "Mountain");

      // // //* 지역 번호 세팅
      // console.log("지역 번호", areaStatMap.get(areaName));

      dispatch(setMapState(areaObj));
      
      //* gm이 선택한 지역의 전체 이름
      // Map - 지역 이름
      const areaMap = new Map();
      areaMap.set("Start", "Myrian");
      areaMap.set("Forest", "Black Forest");
      areaMap.set("Devil", "DevilDom");
      areaMap.set("Cavern", "Dark Cavern");
      areaMap.set("Mountain", "Deep Under the Mountain");
      areaMap.set("Swamp", "Swamp Denizens");

      //* 마지막 글자에 따라서 조사가 달라지기에 뜨는 로그가 다름
      // 마지막 글자
      let lastWordAboutArea = areaMap.get(areaName).substr(-1);

      if (lastWordAboutArea === 'm' || lastWordAboutArea === 'n') {
        areaName = `${areaMap.get(areaName)}으로 이동합니다.`;
      } else {
        areaName = `${areaMap.get(areaName)}로 이동합니다.`;
      }

      // 테스트 출력
      // console.log(areaName);

      //* 방에 있는 사람들에게 alert로 신호를 줌
      // alert(areaName);
      
      //? state를 적용했을 때 사용했던 코드
      // addSignal(areaName);

      
      //* 새로고침해도 로그를 남기기 위해서 redux를 도입
      dispatch(setSignalHistory(areaName));
    }
    //* 서버에서 받은 로그 값
    //* 몬스터 정보 로그 값
    else if(data.body.includes("monsterId")) 
    {
      const monsterInfo = JSON.parse(data.body);
      // 테스트 출력
      console.log("서버에서 받은 값 - 몬스터 정보", monsterInfo);

      // Map - 지역에 따른 몬스터 종류 이름
      const monsterKind = new Map();
      monsterKind.set(1, ["","코볼트", "도마뱀인간", "거대악어", "코아틀"]);
      monsterKind.set(2, ["","코카트리스", "그리폰", "오거", "혼돈의 즙"]);
      monsterKind.set(3, ["","드워프 전사", "지하인", "거미왕", "오튜그"]);
      monsterKind.set(4, ["","인면충", "사슬악마", "가시악마", "천사"]);
      monsterKind.set(5, ["","미노타우르스", "아볼레스", "용", "종말의 용"]);

      //* 마지막 글자에 있는 중성에 따라서 조사가 달라지기에 뜨는 로그가 다름
      // 중성
      const Jung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

      // 마지막 글자
      const monsterName = ((monsterKind.get(monsterInfo.mapArea))[monsterInfo.monsterId]).substr(-1);
      // 중성 추출
      let code = monsterName.charCodeAt(0) - 0xAC00 as number;
      const jong = code % 28; // 종성 
      const jung = ((code - jong) / 28) % 21; // 중성
      // 테스트 출력
      // console.log("몬스터 마지막 글자에 있는 중성:",Jung[jung]);

      let monsterLog : string = '';
      
      // '도마뱀 인간'과 '코아틀'은 조사가 '이'로 들어와야 한다
      if (monsterName === '간' || monsterName === '틀' || monsterName === '즙') {
        monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}이 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
      }
      else if (Jung[jung] === "ㅡ" || Jung[jung] === "ㅓ" || Jung[jung] === "ㅏ") {
        monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}가 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
      } else {
        monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}이 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
      }

      //* 방에 있는 사람들에게 alert로 신호를 줌
      // alert(monsterLog);

      //* 새로고침해도 로그를 남기기 위해서 redux를 도입 
      dispatch(setSignalHistory(monsterLog));
      dispatch(setMonster(monsterInfo));

      //! 몬스터의 정보가 바뀌었을 때마다 강제로 페이지가 이동하도록 작성
      setDivStatus(6);
      //? 추후에는 마스터가 아닌 사람들만 페이지가 이동될 것임
      // if (!gameState.isGm) {
      //   setDivStatus(6);
      // }
    }
    //* 프로필 작성 완료 후 로그값 
    else if(data.body.includes("playerClassName")) 
    {
      const playerProfileInfo : playerProfileType = JSON.parse(data.body);

      const playerClass = new Map();
      playerClass.set("warrior", ["보호의 전사", "피를 탐하는 전사", "힘의 전사"]);
      playerClass.set("wizard", ["회복의 마법사", "혼란의 마법사", "진리탐구 마법사"]);
      playerClass.set("hunter", ["화합의 사냥꾼", "자연 원리주의 사냥꾼", "환경보호의 사냥꾼"]);
      playerClass.set("thief", ["의로운 도적", "뒤를 노리는 도적", "그림자 속 도적"]);
      playerClass.set("priest", ["치유의 사제", "사이비 사제", "질서의 사제"]);

      let classIndex = 0;

      if (playerProfileInfo.playerValue === 'good') {
        classIndex = 0;
      } else if(playerProfileInfo.playerValue === 'evil') {
        classIndex = 1;
      } else {
        classIndex = 2;
      } 

      let playerProfileLog = `${playerProfileInfo.userNickname}님이 ${playerClass.get(playerProfileInfo.playerClassName)[classIndex]} ${playerProfileInfo.playerName}로 환생하셨습니다!`;

      dispatch(setSignalHistory(playerProfileLog));
    }
    //* GM이 플레이어들에게 스탯 포인트를 부여했다는 로그값
    else if (data.body.includes("statPoint")) {
      const statData : statData = JSON.parse(data.body);

      dispatch(setStatPoint(statData.statPoint))

      const statLogMessage = `보상으로 스탯 포인트 ${statData.statPoint} 점이 부여되었습니다!`;
      dispatch(setSignalHistory(statLogMessage));
    }
    //* 주사위를 굴린 로그값
    else if (data.body.includes("diceResult")) {
      const diceResult : diceResult = JSON.parse(data.body);

      const diceLogMessage = `${diceResult.charName} 유저가 ${diceResult.diceCnt} 개의 주사위를 굴려서 ${diceResult.diceResult}의 결과값이 나왔습니다.`;

      dispatch(setSignalHistory(diceLogMessage));
    }
    //* 캐릭터의 체력과 관련된 변화에 대한 로그값
    else if (data.body.includes("userHpChange")) {
      const changeCharHp : changeCharHp = JSON.parse(data.body);

      const monsterKind = new Map();
      monsterKind.set(1, ["","코볼트", "도마뱀인간", "거대악어", "코아틀"]);
      monsterKind.set(2, ["","코카트리스", "그리폰", "오거", "혼돈의 즙"]);
      monsterKind.set(3, ["","드워프 전사", "지하인", "거미왕", "오튜그"]);
      monsterKind.set(4, ["","인면충", "사슬악마", "가시악마", "천사"]);
      monsterKind.set(5, ["","미노타우르스", "아볼레스", "용", "종말의 용"]);

      let charHpLog = ``;

      if (changeCharHp.userHpChange > 0) {
        // 회복
        charHpLog = `${changeCharHp.charName} 유저가 ${changeCharHp.userHpChange}만큼 회복했습니다.`;
        
      } else {
        // 데미지
        console.log("지역위치:", changeCharHp.mapCode);
        
        const monsterCode = typeof changeCharHp.monsterCode == 'string' ? parseInt(changeCharHp.monsterCode) : changeCharHp.monsterCode;
        console.log("몬스터 코드:",monsterCode);        
        
        charHpLog = `${changeCharHp.charName} 유저가 ${(monsterKind.get(changeCharHp.mapCode))[monsterCode]}에게 ${Math.abs(changeCharHp.userHpChange)}만큼 데미지를 받았습니다.`;
      }

      dispatch(setSignalHistory(charHpLog));

      axios({
        method: 'get',
        url: '/api' + `/player/${changeCharHp.playerUserCode}`,
      })
      .then( res => {
        //* 15% 이하의 체력이 남아있을 때
        if (res.data.playerHP === 0) {
          setAdditionalLog(`${changeCharHp.charName} 유저가 루미콘 강을 건넜습니다.`);
          setModalOpen(true);
        }
        //* 15% 이하의 체력이 남아있을 때
        if ((((res.data.playerHP)/(res.data.playerMaxHP)) * 100 < 15) && (res.data.playerHP > 0)) {
          additionalLog = `${changeCharHp.charName} 유저에게 죽음의 그림자가 드리워집니다.`;
        }

        dispatch(setSignalHistory(additionalLog));
      })
      .catch(err => {
        console.error(err.response.data)
      })
    }
    //* 유저가 방에 입장한 로그 값
    else 
    {
      const playerEnter = `${data.body}님이 입장하셨습니다.`;

      //* 새로고침해도 로그를 남기기 위해서 redux를 도입 
      dispatch(setSignalHistory(playerEnter));
    }
  }

  //* 누군자 죽었을 때 뜨는 모달창
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="game-view">
      {/* <h1>GameView</h1> */}
      <LeftController
        signalState = {signalState}/>
      <GamePlay
        // map에서 send
        client = {client}
        gameId = {gameId}
        monsterState = {monsterState}
      />
      <CameraView/>
      <MyController
        client = {client}
        gameId = {gameId}
        dispatch = {dispatch}
      />
      <SetProfile
        client = {client}
        gameId = {gameId}
      />
      <SomeoneDead open={modalOpen} close={closeModal} result={additionalLog} header="X를 눌러 조의를 표하십시오." />
    </div>
  )
}
