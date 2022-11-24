import { useFormik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { setAudioStatus, setProfileDone } from "../../features/Game/GameSlice"
import { addChooseLevel, setJobInfo, subtractChooseLevel } from "../../features/Game/ProfileSlice"
import "./SetProfile.css"
import { hunter, priest, thief, warrior,wizard } from "./ProfileInfoList"
import axios from "axios"
import warriorimg from '../../assets/image/jobs/warrior.png'
import wizardimg from '../../assets/image/jobs/wizard.png'
import hunterimg from '../../assets/image/jobs/hunter.png'
import priestimg from '../../assets/image/jobs/priest.png'
import thiefimg from '../../assets/image/jobs/thief.png'


export default function SetProfile({client, gameId} : {client : any, gameId : any}) {
  const dispatch = useAppDispatch()
  const chooseLevel = useSelector((state: RootState) => state.profile.chooseLevel)
  const profileDone = useSelector((state:RootState) => state.game.profileDone)
  const jobInfo = useSelector((state:RootState) => state.profile.jobInfo)
  const userCode = useAppSelector((state:RootState) => state.user.userCode)
  const userNickname = localStorage.getItem('user_nickname');
  const isGm = useAppSelector((state:RootState) => state.room.isGm)
  const selectJobInfo = (job:string) => {
    if (job === 'warrior') {
      dispatch(setJobInfo(warrior))
    }
    if (job === 'wizard') {
      dispatch(setJobInfo(wizard))
    }
    if (job === 'hunter') {
      dispatch(setJobInfo(hunter))
    }
    if (job === 'thief') {
      dispatch(setJobInfo(thief))
    }
    if (job === 'priest') {
      dispatch(setJobInfo(priest))
    }
  }
  
  const formik = useFormik({
    initialValues: {
      playerUserCode: userCode ,
      playerSpecies: '',
      playerName: '',
      playerLook: '',
      playerValue: 'good',
      playerWeapon: '',
      playerArmor: '',
      playerHP: 0,
      playerSup1: 0,
      playerSup2: 0,
      playerSup3: 0,
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
    validationSchema: Yup.object({
      // playerSpecies: Yup.string()
      // .required('Required'),
      // playerName: Yup.string()
      // .required('Required'),
      playerLook: Yup.string()
      .required('Required'),
      playerStat1: Yup.number()
      .required('Required')
      .min(3),
      playerStat2: Yup.number()
      .required('Required')
      .min(3),
      playerStat3: Yup.number()
      .required('Required')
      .min(3),
      playerStat4: Yup.number()
      .required('Required')
      .min(3),
      playerStat5: Yup.number()
      .required('Required')
      .min(3),
      playerStat6: Yup.number()
      .required('Required')
      .min(3),
      // class_name: Yup.string()
      // .required('Required'),

     
    }),
    onSubmit: async (profile) => {
      console.log('보내는중')
      console.log(profile)
      if (profile.playerClassName === 'warrior') {
        formik.values.playerHP =10
        formik.values.playerSkill1 = "피의 향기"
        formik.values.playerSkill2 = "고유 병기의 종류"
        formik.values.playerSkill3 = "병기의 영"
        formik.values.playerWeapon = "평범한 한손 대검"
      }
      if (profile.playerClassName === 'wizard') {
        formik.values.playerHP =4
        formik.values.playerSkill1 = "주문강화"
        formik.values.playerSkill2 = "화염탄"
        formik.values.playerSkill3 = "마력의 방패"
        formik.values.playerWeapon = "평범한 완드"
      }
      if (profile.playerClassName === 'hunter') {
        formik.values.playerHP =8
        formik.values.playerSkill1 = "암습"
        formik.values.playerSkill2 = "프로의 솜씨"
        formik.values.playerSkill3 = "덫 전문가"
        formik.values.playerWeapon = "평범한 활"
      }
      if (profile.playerClassName === 'hunter') {
        formik.values.playerHP =8
        formik.values.playerSkill1 = "정조준"
        formik.values.playerSkill2 = "야성의 교감"
        formik.values.playerSkill3 = "더블샷"
        formik.values.playerWeapon = "평범한 활"
      }
      if (profile.playerClassName === 'thief') {
        formik.values.playerHP =6
        formik.values.playerSkill1 = "암습"
        formik.values.playerSkill2 = "프로의 솜씨"
        formik.values.playerSkill3 = "덫 전문가"
        formik.values.playerWeapon = "평범한 단도"
      }
      if (profile.playerClassName === 'priest') {
        formik.values.playerHP =8
        formik.values.playerSkill1 = "신 + 탄원"
        formik.values.playerSkill2 = "치유"
        formik.values.playerSkill3 = "천벌"
        formik.values.playerWeapon = "평범한 기도서"
      }
      formik.values.playerStat1 = Number(formik.values.playerStat1)
      console.log(profile)
      axios({
        method: 'POST',
        url: '/api' + '/player',
        data: profile
      })
      .then( (res) => {
        console.log(res)
        }
      )
      const completedPlayer = {
        userNickname : userNickname,
        playerValue: profile.playerValue,
        playerClassName : profile.playerClassName,
        playerName : profile.playerName        
      }
      
      client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(completedPlayer), {id : gameId});
      dispatch(setProfileDone())
      dispatch(setAudioStatus(true))
    }}
    
  )
    return (
        <div id="select-profile-modal" className={profileDone || isGm==true ? "off-btn" : "on"}>
          <div id="blank">{chooseLevel===-1? jobInfo.name: chooseLevel===0 ?"Select Class" : chooseLevel===1 ? "Input Profile" :"Roll Stats"}</div>
          <form action="" id="set-profile-form" onSubmit={formik.handleSubmit}>

            {/* job */}
            <div id="job-form" className={chooseLevel===0 ?"on" : "off-btn"}>
              <h1>{formik.values.playerClassName}</h1>
              <div className="btn-box">
                <button id="warrior" name="playerClassName" className="job-btn" type="button" onClick={formik.handleChange} value = "warrior">
                  <img id='warrior-img'src={warriorimg} alt="" />
                </button>
                <button id="wizard" name="playerClassName" className="job-btn" type="button" onClick={formik.handleChange} value = "wizard">
                  <img id='warrior-img'src={wizardimg} alt="" />
                </button>
              </div>
              <div className="btn-box">
                <button id="hunter" name="playerClassName" className="job-btn" type="button" onClick={formik.handleChange} value = "hunter">
                <img id='warrior-img'src={hunterimg} alt="" />
                </button>
                <button id="thief" name="playerClassName" className="job-btn" type="button" onClick={formik.handleChange} value = "thief">
                <img id='warrior-img'src={thiefimg} alt="" />
                </button>
              </div>
              <div className="btn-box">
                <button id="priest" name="playerClassName" className="job-btn" type="button" onClick={formik.handleChange} value = "priest">
                <img id='warrior-img'src={priestimg} alt="" />
                </button>
              </div>
            </div>
            <div id="profile-form" className={chooseLevel===1 ?"on" : "off-btn"}>
              <div className="profile-input-box">
                <label htmlFor="playerName" className="profile-label">Name</label>
                <input id="playerName" name="playerName" type="text" className="profile-input" onChange={formik.handleChange} value={ formik.values.playerName }/>
              </div>

              {/* profile */}
              <div className="profile-input-box">
                <label htmlFor="playerSpecies" className="profile-label">Species</label>
                <input id="playerSpecies" name="playerSpecies" type="text" className="profile-input" onChange={formik.handleChange} value={ formik.values.playerSpecies }/>
              </div>
              <div className="profile-input-box">
                <label htmlFor="playerLook" className="profile-label">Look</label>
                <textarea id="playerLook" name="playerLook"  className="profile-text" onChange={formik.handleChange} value={ formik.values.playerLook}/>
              </div>
              <div className="profile-input-box">
                <label htmlFor="playerValue" className="profile-label">Value</label>
                <select name="playerValue" id="playerValue" onChange={formik.handleChange} value={ formik.values.playerValue} className="profile-input">
                  <option value="good">선</option>
                  <option value="evil">악</option>
                  <option value="neutral">중립</option>
                </select>
              </div>
            </div>
             
             {/* stat */}
            <div id="stat-form" className={chooseLevel===2 ?"on" : "off-btn"}>
              <div className="profile-stat-box">
                <label htmlFor="playerStat1" className="profile-label">근력 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat1}</span>
                  <button className="stat-btn" id="playerStat1" name="playerStat1" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerStat2" className="profile-label">민첩 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat2}</span>
                  <button className="stat-btn" id="playerStat2" name="playerStat2" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerStat3" className="profile-label">체력 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat3}</span>
                  <button className="stat-btn" id="playerStat3" name="playerStat3" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerStat4" className="profile-label">지능 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat4}</span>
                  <button className="stat-btn" id="playerStat4" name="playerStat4" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerStat5" className="profile-label">지혜 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat5}</span>
                  <button className="stat-btn" id="playerStat5" name="playerStat5" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerStat6" className="profile-label">매력 :</label>
                <div className="stat-container">
                  <span className="stats">{formik.values.playerStat6}</span>
                  <button className="stat-btn" id="playerStat6" name="playerStat6" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              
            </div>

            {/* Info */}
            <div className={chooseLevel=== -1 ?"on" : "off-btn"} id="job-info">
              <div className="job-info-btn-box">
                <button onClick={() => selectJobInfo('warrior')} type="button" className="job-info-btn">Warrior</button>
                <button onClick={() => selectJobInfo('wizard')} type="button" className="job-info-btn">Wizard</button>
                <button onClick={() => selectJobInfo('hunter')} type="button" className="job-info-btn">Hunter</button>
                <button onClick={() => selectJobInfo('thief')} type="button" className="job-info-btn">Thief</button>
                <button onClick={() => selectJobInfo('priest')}type="button"  className="job-info-btn">Priest</button>
              </div>
              <div className="job-info-hp-box">
                HP : {jobInfo.hp}
              </div>
              <div className="job-info-skill-box">
                <div className="job-info-skill">
                  <span>{jobInfo.skill[0]}</span>
                </div>
              </div>
              <div className="job-info-value-box">
                <div className="job-info-value">
                  <span>선 : {jobInfo.value.good}</span>
                </div>
                <div className="job-info-value">
                  <span>악 : {jobInfo.value.evil}</span>
                </div>
                <div className="job-info-value">
                  <span>중립 : {jobInfo.value.neutral}</span>
                </div>
              </div>
            </div>
            <div className={chooseLevel===3 ?"on" : "off-btn"} id="job-submit">
              <button type="submit" className="last-ctrl-btn">Submit</button>
            </div>
        </form>


          {/* Navbar */}
          {chooseLevel===-1 ? <div className="nav-bot" id="first-nav-bot">
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel===0 ?
          <div className="nav-bot">
            <button onClick={() => dispatch(subtractChooseLevel()) } className="ctrl-btn">Info</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel === 1?
          <div className="nav-bot">
            <button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel === 2?
          <div className="nav-bot">
            <button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
            
          </div> :
          <div><button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button></div>}
          
        </div>
    
    )
}