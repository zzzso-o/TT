import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import {warrior, wizard, hunter, thief, priest} from "../Game/ProfileInfoList"
import ProfileSlice, { getPlayerProfile } from "../../features/Game/ProfileSlice"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { getRoomInfo } from "../../features/room/RoomSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import './PlayerProfile.css'
import { setStatPoint } from "../../features/Game/GameSlice"
import statArrow from "../../assets/image/statUp.png"
import hunterimg from '../../assets/image/jobs/hunter.png'
import priestimg from '../../assets/image/jobs/priest.png'
import thiefimg from '../../assets/image/jobs/thief.png'
import warriorimg from '../../assets/image/jobs/warrior.png'
import wizardimg from '../../assets/image/jobs/wizard.png'


export default function PlayerProfile() {
    const playerNum = useSelector((state: RootState) => state.left.playerNum)
    const playerUserCode = useSelector((state:RootState)=>state.profile.playerUserCode)
    let roomInfo = useParams().gameId
    const player1 = useAppSelector((state:RootState) => state.room.py1Code)
    const player2 = useAppSelector((state:RootState) => state.room.py2Code)
    const player3 = useAppSelector((state:RootState) => state.room.py3Code)
    const player4 = useAppSelector((state:RootState) => state.room.py4Code)
    const player5 = useAppSelector((state:RootState) => state.room.py5Code)
    const thisPlayerCode = playerNum === 1? player1: playerNum === 2? player2 : playerNum === 3? player3: playerNum === 4? player4 : player5
    const statPoint = useAppSelector((state:RootState) => state.game.statPoint)
    const dispatch = useAppDispatch()
    const currentUserCode = localStorage.getItem('userCode')

    const DOMAIN = "http://localhost:8080"
    useEffect(() => {
      console.log(player1)
      axios({
        method: 'GET',
        url:  '/api' + `/player/${thisPlayerCode}`
      })
      .then((res) => {
        console.log(res.data)
        dispatch(getPlayerProfile(res.data))
      })
      .catch(err => {
        console.error(err.response.data)
      })
    })

    const statUp = (statType: number) => {
      dispatch(setStatPoint(-1))
      axios({
        method: 'PUT',
        url: '/api' +`/player/${thisPlayerCode}/statchange`,
        data: {statIndex: statType, amountOfChangeStat: 1}
      })
      .then(res =>{
        console.log(res)
        axios({
          method: 'GET',
          url:  '/api' + `/player/${thisPlayerCode}`
        })
        .then((res) => {
          console.log(res.data)
          dispatch(getPlayerProfile(res.data))
        })
        .catch(err => {
          console.error(err.response.data)
        })
      })
    }

    
    
    const species = useSelector((state:RootState)=>state.profile.playerSpecies)
    const name = useSelector((state:RootState)=>state.profile.playerName)
    const look = useSelector((state:RootState)=>state.profile.playerLook)
    const value = useSelector((state:RootState)=>state.profile.playerValue)
    const weapon = useSelector((state:RootState)=>state.profile.playerWeapon)
    const armor = useSelector((state:RootState)=>state.profile.playerArmor)
    const hp = useSelector((state:RootState)=>state.profile.playerHP)
    const level = useSelector((state:RootState)=>state.profile.chooseLevel)
    const job = useSelector((state:RootState)=>state.profile.playerClass)
    const sup1 = useSelector((state:RootState)=>state.profile.playerSup1)
    const sup2 = useSelector((state:RootState)=>state.profile.playerSup2)
    const sup3 = useSelector((state:RootState)=>state.profile.playerSup3)
    const stat1 = useSelector((state:RootState)=>state.profile.playerstat1)
    const stat2 = useSelector((state:RootState)=>state.profile.playerstat2)
    const stat3 = useSelector((state:RootState)=>state.profile.playerstat3)
    const stat4 = useSelector((state:RootState)=>state.profile.playerstat4)
    const stat5 = useSelector((state:RootState)=>state.profile.playerstat5)
    const stat6 = useSelector((state:RootState)=>state.profile.playerstat6)
    const skill1 = useSelector((state:RootState)=>state.profile.skill1)
    const skill2 = useSelector((state:RootState)=>state.profile.skill2)
    const skill3 = useSelector((state:RootState)=>state.profile.skill3)
    const playerMaxHp = useSelector((state:RootState) => state.profile.playerMaxHp)

    return (
      <div id="player-profile">
      <h1>{name}님의 프로필</h1>
        <div className="pp-container">
          <div>
            {job === 'warrior' ? <img className="jobimg" src={warriorimg} alt="warrior" /> : job === 'hunter' ? <img className="jobimg" src={hunterimg} alt="hunter" /> : job === 'priest' ? <img className="jobimg" src={priestimg} alt="priest" /> : job === 'wizard' ? <img className="jobimg" src={wizardimg} alt="wizard" /> : <img className="jobimg" src={thiefimg} alt="thief" /> }
          </div>
          <div className="pp-group">
            <div className="pp-title">
              <label className="gameprofile-subtitle" htmlFor="job">직업</label>
              <div className="pp-userInfo">{job}</div>
            </div>
            <div className="pp-title">
              <label className="gameprofile-subtitle" htmlFor="species">종족</label>
              <div className="pp-userInfo">{species}</div>
            </div>
            <div className="pp-title">
              <label className="gameprofile-subtitle" htmlFor="value">가치관</label>
              <div className="pp-userInfo">{value}</div>
            </div>
            <div className="pp-title">
              <label className="gameprofile-subtitle" htmlFor="hp">체력</label>
              <progress className="hp-bar" max={playerMaxHp} value={hp}></progress>
              <div className="pp-userInfo">{hp}</div>
            </div>            
          </div> 
        </div>
          <div className="pp-container-two">
            <div className="pp-title-look">
              <label className="gameprofile-subtitle" htmlFor="look">외형</label>
              <div className="pp-userInfo">{look}</div>
            </div>   
            <div className="item-part">
              <div className="weapon-armor">
                <div className="pp-title-item">
                  <label className="gameprofile-subtitle" htmlFor="weapon">무기</label>
                  <div className="pp-userinfo">{weapon}</div>
                </div>
                <div className="pp-title-item">
                  <label className="gameprofile-subtitle" htmlFor="armor">방어구</label>
                  <div className="pp-userinfo">{armor}</div>
                </div>
              </div>
              <div className="stat-title">
                <label className="gameprofile-subtitle" htmlFor="sup">소지품</label>
                <li className="pp-userinfo">회복약: lv.{sup1}</li>
                <li className="pp-userinfo">해독제: {sup2}개</li>
                <li className="pp-userinfo">식량: lv.{sup3}</li>
              </div>
            </div>
            <div className="stat-skill">
              <div className="stat-title">
                <label className="gameprofile-subtitle" htmlFor="stat">stat</label>
                <div className="stat-group">
                  <li className="pp-userinfo">근력: {stat1} 
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(1)} className="stat-arrow"></img>:null}</li>
                </div>
                <div className="stat-group">
                  <li className="pp-userinfo">민첩: {stat2}
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(1)} className="stat-arrow"></img>:null}</li>
                </div>
                <div className="stat-group">
                  <li className="pp-userinfo">체력: {stat3}
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(1)} className="stat-arrow"></img>:null}</li>
                </div>
                <div className="stat-group">
                  <li className="pp-userinfo">지능: {stat4}
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(1)} className="stat-arrow"></img>:null}</li>
                </div>
                <div className="stat-group">
                  <li className="pp-userinfo">지혜: {stat5}
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(1)} className="stat-arrow"></img>:null}</li>
                </div>
                <div className="stat-group">
                  <li className="pp-userinfo">매력: {stat6}
                  {statPoint > 0 && ((playerNum == 1 && player1 == currentUserCode)|| (playerNum == 2 && player2 == currentUserCode) ||(playerNum == 3 && player3 == currentUserCode)|| (playerNum == 4 && player4 == currentUserCode)|| (playerNum == 5 && player5 == currentUserCode))? <img src={statArrow} onClick={() => statUp(6)} className="stat-arrow"></img>:null}</li>
                </div>
              </div>
              <div className="stat-title">
                <label className="gameprofile-subtitle" htmlFor="skill">skill</label>
                <li className="pp-userinfo">{skill1}</li>
                <li className="pp-userinfo">{skill2}</li>
                <li className="pp-userinfo">{skill3}</li>
              </div>
            </div>
          </div>


      </div>
    )
}