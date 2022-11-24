import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../app/hooks"
import { saveToken } from "../features/user/loginSlice"
import { fetchProfile } from '../features/user/userSlice'
//* 구글 로그인
import { GoogleLogin } from '@react-oauth/google';

//* jwt-decode
import jwt_decode from "jwt-decode";

import './GoogleLoginButton.css'

function GoogleLoginButton() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const login = GoogleLogin({
        size: 'large',
        theme: 'filled_blue',
        shape: 'square',
        type: 'icon',
        onSuccess: async (credentialResponse : any) => {
          // console.log(credentialResponse);
          if (credentialResponse != null) {
            const token = credentialResponse.credential;
            const decoded = jwt_decode(token) as any;
       
            //* 테스트 출력
            console.log(decoded);
      
            const emailFromGoogle = decoded.email;
      
            await axios({
              method: 'POST',
              url: '/api' + '/google/register',
              data: emailFromGoogle
            })
              .then(async (res) =>{ 
              console.log(res.data)
      
              const payload = {accessToken : token, currentUser: emailFromGoogle, refreshToken: ''}
              dispatch(saveToken(payload))
              await axios({
                method: "GET",
                url: '/api' + `/user/userinfo/${localStorage.getItem('current_user')}`,
                
              })
                .then((res) => {
                  console.log(res.data);
                  
                  dispatch(fetchProfile(res.data))
                  localStorage.setItem('userCode', res.data.userCode)
                })
                .catch((err) => {
                  console.error(err.response.data);
                });
              navigate('/about')
            })
          }
        },
        onError: () => {
          console.log('Login Failed');
        }
      });
    return (
        <>
            <div className='login-with-google' >
                {login}
            </div>
        </>
    )
}

export default GoogleLoginButton;