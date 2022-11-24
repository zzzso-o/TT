import { ftruncateSync } from "fs"
import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { fetchProfile } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './Profile.css'
import Navbar from "../../components/Navbar";


export default function Profile() {
  const token = useAppSelector((state: RootState) => state.login.token)
  const data = useAppSelector((state:RootState) => state.login.currentUser)
  const userId = useAppSelector((state:RootState) => state.user.userId)
  const userPw = useAppSelector((state:RootState) => state.user.userPw)
  const userEmail = useAppSelector((state:RootState) => state.user.userEmail)
  const userPhone = useAppSelector((state:RootState) => state.user.userPhone)
  const userGender = useAppSelector((state:RootState) => state.user.userGender)
  const userNickname = useAppSelector((state:RootState) => state.user.userNickname)
  const userCode = useAppSelector((state:RootState) => state.user.userCode)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const DOMAIN = 'http://localhost:8080/'


  useEffect(() => {
    axios({
      method: "GET",
      url: '/api' + `/user/userinfo/${localStorage.getItem('current_user')}`,
    })
      .then((res) => {
        dispatch(fetchProfile(res.data))
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  },[data])



    return (
        <div id="profile-page">
          <Navbar />
          <div className="profile-box">
            <div className="profile-nickname">              
              <div>{userNickname} 님, 안녕하세요!</div>    
            </div>
            <div className="p-group">
              <label className="profile-subtitle" htmlFor="">ID</label>
              <div className="profile-els">{userId}</div>
            </div>
            <div className="p-group">
              <label className="profile-subtitle" htmlFor="">E-MAIL</label>
              <div className="profile-els">{userEmail}</div>
            </div>
            <div className="p-group">
              <label className="profile-subtitle" htmlFor="">PHONE</label>
              <div className="profile-els">{userPhone}</div>
            </div>
            <div className="p-group">
              <label className="profile-subtitle" htmlFor="">GENDER</label>
              <div className="profile-els">{userGender}</div>
            </div>
            {/* <button onClick={editUserInfo}>
              내 정보 수정하기
            </button> */}
          </div>                
        </div>
        
    )
}