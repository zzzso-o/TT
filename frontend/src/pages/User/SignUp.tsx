import { initialState } from "../../features/user/userSlice"
import React from 'react'
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import * as Yup from 'yup'
import './SignUp.css'
import axios from "axios"
import {Select} from "@chakra-ui/select"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const DOMAIN = "http://localhost:8080/"
  const registerRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then((res) =>{ 
      
      console.log(res.data)
      if (res.data.message === 'true') {
        navigate('/login')  
      } else {
        alert('이미 가입되어 있는 유저입니다!')
      }
    })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      userId: Yup.string()
      .max(15, '15자를 초과할 수 없습니다.')
      .required('ID를 입력해주세요'),
      userPw: Yup.string()
      .max(20, '20자를 초과할 수 없습니다.')
      .min(10, '비밀번호는 10자 이상이어야 합니다.')
      .required('PW를 입력해주세요.'),
      userNickname: Yup.string()
      .max(10, '10자를 초과할 수 없습니다.')
      .required('닉네임을 입력해주세요.'),
      userEmail: Yup.string()
      .email('email 형식이 아닙니다.')
      .required('email을 입력해주세요.'),
      userPhone: Yup.string()
      .required('전화번호를 입력해주세요.'),
      // userGender: Yup.string() 
      // .required('Required')
    }),
    onSubmit: (credentials) => {
      console.log(credentials)
      {registerRequest('POST','/api' + '/user/register', credentials)}
    } 
    
  })
  const test: any = () => {
    console.log('아아아아앙ㅜㅜ')
  }
    return (
      <div className="signup-background" id='signup-container'>
        <div id='all-signup'>
          <div id='signup-form'>
            <h1 id='signup-text'>SignUp</h1>
            <form id='signup-form' action="" onSubmit={formik.handleSubmit}>

            <label className="signup-label" htmlFor="userId">Id</label>
            <input id="userId" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>
            {formik.touched.userId && formik.errors.userId ? (
              <div className='error-message'>{formik.errors.userId}</div>
            ) : null}

            <label className="signup-label" htmlFor="userPw">Password</label>
            <input id="userPw" name="userPw" type="password" onChange={formik.handleChange} value={ formik.values.userPw }/>
            {formik.touched.userPw && formik.errors.userPw ? (
              <div className='error-message'>{formik.errors.userPw}</div>
            ) : null}

            <label className="signup-label" htmlFor="userNickname">Nickname</label>
            <input id="userNickname" name="userNickname" type="text" onChange={formik.handleChange} value={ formik.values.userNickname }/>
            {formik.touched.userNickname && formik.errors.userNickname ? (
              <div className='error-message'>{formik.errors.userNickname}</div>
            ) : null}

            <label className="signup-label"  htmlFor="userEmail">e-mail</label>
            <input id="userEmail" name="userEmail" type="text" onChange={formik.handleChange} value={ formik.values.userEmail }/>
            {formik.touched.userEmail && formik.errors.userEmail ? (
              <div className='error-message'>{formik.errors.userEmail}</div>
            ) : null}

            <label className="signup-label"  htmlFor="userPhone">Phone</label>
            <input id="userPhone" name="userPhone" type="text" onChange={formik.handleChange} value={ formik.values.userPhone }/>
            {formik.touched.userPhone && formik.errors.userPhone ? (
              <div className='error-message'>{formik.errors.userPhone}</div>
            ) : null}

            <label className="signup-label" htmlFor="userGender">Gender</label>
            <select id="userGender" name="userGender" onChange={formik.handleChange} value={ formik.values.userGender }>
              <option value="" disabled selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="none">None</option>
            </select>
            <button id="signup-button" className="button button--moema button--inverted button--text-thick button--size-s" type="submit">Sign up</button>
          </form>
          </div>
          <div id='signup-with'>
              <div id='line'>
                <hr />
              </div>
              <div id='signup-with-text'>
                <p>or Login</p>
              </div>
              <div id='line'>
                <hr />
              </div>
          </div>
          <div className='signup-with-btn'>
            <button id="signup-login"  className="button button--moema button--inverted button--text-thick button--size-s" onClick={() => {navigate('/login')}}>Login</button>
          </div>
        </div>
    </div>
        
    )
}