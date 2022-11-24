
import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import './LogIn.css'

import { saveToken } from "../../features/user/loginSlice"
import { fetchProfile } from '../../features/user/userSlice'

//* 구글 로그인
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '../../components/GoogleLoginButton'

//* 구글 로그인
const clientId = "842267246005-v7i0ucc1bog9gtuvk8fgur177ua8v8ol.apps.googleusercontent.com"

// Login Dispatch
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const DOMAIN = "http://localhost:8080/"
  const naverLogin: any = () => {
    axios({
      method: 'GET',
      url: '/api/OAuth/google'
    })
    .then( async (res) => {
       console.log(res.data)
        const token = res.data.accessToken
        const currentUser = res.data.userId
        const refreshToken = res.data.refreshToken
        const payload = {accessToken : token, currentUser: currentUser, refreshToken: refreshToken}
        await dispatch(saveToken(payload))
        axios({
          method: "GET",
          url: '/api' + `/user/userinfo/${localStorage.getItem('current_user')}`,
          
        })
          .then((res) => {
            dispatch(fetchProfile(res.data))
            localStorage.setItem('userCode', res.data.userCode)
          })
          .catch((err) => {
            console.error(err.response.data);
          });
        navigate('/about')
       
    })
    .catch(err => {
      console.error(err.response.data)
    })
  }
  const loginRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then(async (res) => {
        console.log(res.data)
        const token = res.data.accessToken
        const currentUser = res.data.userId
        const refreshToken = res.data.refreshToken
        const payload = {accessToken : token, currentUser: currentUser, refreshToken: refreshToken}
        await dispatch(saveToken(payload))
        axios({
          method: "GET",
          url: '/api' + `/user/userinfo/${localStorage.getItem('current_user')}`,
          
        })
          .then((res) => {
            dispatch(fetchProfile(res.data))
            localStorage.setItem('userCode', res.data.userCode)
          })
          .catch((err) => {
            console.error(err.response.data);
          });
        navigate('/about')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }
  
  //  user Formik
  const formik = useFormik({
    initialValues: {userId: '', userPw:''},
    validationSchema: Yup.object({
      userId: Yup.string()
      .required('Required'),
      userPw: Yup.string()
      .required('Required'),
    }),
    onSubmit: (credentials) => {loginRequest('POST', '/api' + '/user/login', credentials)}
  
  })

  // HTML
    return (
      <div className='login-background' id='login-container'>
        <div id='all-login'>
          <div id='login-box'>
            <h1 id='login-text'>Login</h1>
            <form id='login-form' action="" onSubmit={ formik.handleSubmit }>
              
              <label id='id-label' htmlFor="userId">ID</label>
              <input id="id-input" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

              <label id='pwd-label' htmlFor="userPw">Password</label>
              <input id="pwd-input" name="userPw" type="password" onChange={formik.handleChange} value={ formik.values.userPw }/>
              <button id='login-button' className="button button--moema button--inverted button--text-thick button--size-s" type="submit">LogIn</button>
            </form>
          </div>
            <div id='login-with'>
              <div id='line'>
                <hr />
              </div>
              <div id='login-with-text'>
                <p>or LogIn with</p>
              </div>
              <div id='line'>
                <hr />
              </div>
          </div>
          <div className='login-with-btn'>
            <div className='login-with-google'>
              <GoogleOAuthProvider clientId={clientId} >
                <GoogleLoginButton />
                {/* <div className='login-with-google' onClick={() => login()}>
                  <GoogleLogin
                    type="icon"
                    theme="filled_blue"
                    width='80px'
                    onSuccess={googleLoginSuccess}
                    onError={googleLoginError}
                  />
                </div> */}
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
        
    )
}
