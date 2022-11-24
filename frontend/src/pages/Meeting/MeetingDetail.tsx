import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingDetail, setNotParticipated, setParticipated }  from '../../features/meeting/meetingSlice';
import { fetchProfile } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import '../ArticleDetail.css'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function MeetingDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userCode = useSelector((state: RootState) => state.user.userCode)
  let articleId = useParams().articleId
  let startTime = useSelector((state:RootState) => state.meeting.meetingGameIsStart)
  const user_authority = window.localStorage.getItem('user_authority');


  

  // 1. userId 찾는법
  // 2. 배열 형태가 {GM, [player1,2,3,...]}? {[  ]} 


  // 버튼 누르면 그 유저의 아이디를 배열에 저장
  const enrollGm = () => {
    axios({
      method:'PUT',
      url: '/api' + '/meeting/gmEnroll',
      data: {
        meetingCode: roomCode,
        userCode: userCode,
      }
    })
    .then( (res) => {
      console.log(res)
      axios({ 
        method: 'GET',
        url: '/api' + `/meeting/${articleId}`
      })
        .then((res) => {
          console.log(res.data)
          dispatch(getMeetingDetail(res.data))
          dispatch(setParticipated())

        })
        .catch(err => {
          console.error(err.response.data)
        })
    })
  }

    const enrollPy = () => {
      console.log(roomCode)
      axios({
        method:'PUT',
        url: '/api' + '/meeting/playerEnroll',
        data: {
          meetingCode: roomCode,
          userCode: userCode,
        }
      })
      .then( (res) => {
        console.log(res)
        axios({ 
          method: 'GET',
          url: '/api' + `/meeting/${articleId}`
        })
          .then((res) => {
            console.log(res.data)
            dispatch(getMeetingDetail(res.data))
            dispatch(setParticipated())
  
          })
          .catch(err => {
            console.error(err.response.data)
          })
      })
    }


    
    //서버에 post로 요청 보내기
    const roomInfoRequest: any= (method: string, url: string, data: object) => {
      return axios({
        method,
        url: url,
        data: data
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err.response.data)
      })
    }
    
  // const submitRoomInfo = (data) => {
    
  // }
  
  



  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
      
      axios({ 
        method: 'GET',
        url: '/api' + `/meeting/${articleId}`
      })
        .then((res) => {
          console.log(res.data)
          dispatch(setNotParticipated())
          if (res.data.gmUserRes != null && currentUser == res.data.gmUserRes.userCode) {
            console.log('지앰등장')
            dispatch((setParticipated()))
          }
          for (let player of res.data.pyUserResList) {
            
            if (player.userCode == currentUser) {
              console.log('goTk')
              dispatch(setParticipated())
            }
          }
          dispatch(getMeetingDetail(res.data))

        })
        .catch(err => {
          console.error(err.response.data)
        })
  },[])
  const meetingDeleteRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: url
      // data: {
      //   shareCode: articleId,
      // },
    })
      .then(res => {
        console.log(res.data)
        navigate('/meeting')
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }


  const title = useSelector((state:RootState ) => state.meeting.meetingTitle)
  const content = useSelector((state:RootState) => state.meeting.meetingContent)
  const author = useSelector((state:RootState) => state.meeting.meetingAuthor)
  const player = useSelector((state:RootState) => state.meeting.meetingPyNum)
  const time = useSelector((state:RootState) => state.meeting.meetingPyTime)
  const code = useSelector((state:RootState) => state.meeting.meetingCode)
  const roomCode = useAppSelector((state:RootState) => state.meeting.roomCode)
  const userNickname = useAppSelector((state:RootState) => state.user.userNickname)
  const playerList = useAppSelector((state:RootState) => state.meeting.playerList)
  const GmPlayer = useAppSelector((state:RootState) => state.meeting.Gm)
  const currentUser = useAppSelector((state:RootState) => state.user.userCode)
  const participated = useAppSelector((state:RootState) => state.meeting.participated)
  const playerNum = useAppSelector((state:RootState) => state.meeting.meetingPyNum)
  const gameIsStart = useAppSelector((state:RootState) => state.meeting.gameIsStart)

  //입장시간 나타내는 함수
  setTimeout(function() {
    startTime = true;
  }, 3000)

  const formik = useFormik({
    initialValues: {meetingCode:articleId},
    onSubmit: (data) => {
      console.log(data)
      meetingDeleteRequest('DELETE', '/api' + `/meeting/${articleId}`, data)}
  })
  const onClick = () => {
    // 방을 이동하고
    navigate(`/game/${roomCode}`,{
      state: {
        sessionId: roomCode,
        username: userNickname
      }
    })
    window.location.reload();
  }

    return (
        <div id='detail'>
          <Navbar />
          <div  className='detail-container'>           
            <h1 className='detail-title'>{title}</h1>                  
            <form action="" onSubmit={formik.handleSubmit} className="detail-form">
              <div className='postedby'>
                <label className='author-tag' htmlFor="meetingAuthor">POSTED BY | </label>
                <div className='author-name'>
                  {author}
                </div>
              </div>              
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingContent">CONTENT</label>
                <div className='content-part'>
                  {content}
                </div>
              </div>
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingPyNum">PLAYER NUMBER</label>
                <div className='dinp'>
                  {player}
                </div>
              </div>
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingPyTime">PLAY TIME</label>
                <div className='dinp'>
                  {time}
                </div>
              </div>
              <div className='positiongroup'>
                <div className='pygroup'>
                  <label className='pysubtitle' htmlFor="">GM</label>
                  <div className='player'>
                    <span>{GmPlayer.userNickname}</span>
                  </div>
                  <button className='enroll' onClick={(userId) => enrollGm()} type="button" id={participated===true || GmPlayer.userCode != 0?"enroll-off":"enroll-on"}>enroll</button>
                </div>
                <div className='pygroup'>
                  <label className='pysubtitle' htmlFor="">Player</label>
                  <div className='player'>
                    {playerList.map((player: any,idx : any) => {
                      return <span>{player.userNickname}</span>
                    })}
                  </div>
                  <button className='enroll' onClick={(userId) => enrollPy()} type="button" id={participated===true || playerList.length == (playerNum - 1) ?"enroll-off":"enroll-on"}>enroll</button>
                </div>
              </div>             
              <div className='enroll-btn'>
                <button className='enroll-game' onClick={onClick} type="button" id = {gameIsStart && participated===true? "enroll-on":"enroll-off"}>입장</button>
              </div>
              {author === localStorage.getItem('user_nickname') ? 
                <div className='detail-btn-group' id={userNickname == author? "de-btn-on": "de-btn-off" }>
                  <button className='detail-btn' onClick={() => navigate(`/meeting/edit/${code}`)} type="button">edit</button>
                  <button className='detail-btn' type='submit'>delete</button>
                </div>
              :null}
            </form>
          </div>
        </div>
        
    )
}