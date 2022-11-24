import React from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { useFormik } from 'formik'
import { Formik, Field } from 'formik';
import { request } from "../../utils/axios"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../ArticleCreate.css'
import * as Yup from 'yup'
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Navbar from '../../components/Navbar';

export default function InfoCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()
  const userId = useAppSelector((state: RootState) => state.user.userNickname)

  const shareRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then(res => {
        console.log(res.data)
        navigate('/share')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }


  const formik = useFormik({
    initialValues: {shareTitle:'', shareContent: '', shareAuthor: ''},
    validationSchema: Yup.object({
      shareTitle: Yup.string()
        .required('제목을 입력해주세요.')
        .max(30, '30자를 초과할 수 없습니다.'),

      shareContent: Yup.string()
        .required('내용을 입력해주세요.')
        .max(1000, '1000자를 초과할 수 없습니다.')
    }),
    onSubmit: (data) => {
      formik.values.shareAuthor = userId
      console.log(data)
      shareRegisterRequest('POST', '/api' + '/share/register', data)},
    })


    return (
        <div id='create'>
          <Navbar />
          <div className='create-container'>
              <h1>InfoCreate</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className='rows'>
                <label className='mini-title' htmlFor='shareTitle'>Title</label>
                <div className='inp-group'>
                  <input className='inp-tags' name='shareTitle' type='text' onChange={formik.handleChange} value={formik.values.shareTitle} />
                  {formik.touched.shareTitle && formik.errors.shareTitle ? (
                    <div className='error-message'>{formik.errors.shareTitle}</div>
                  ) : null}
                </div>           
              </div>
              <div className='rows'>
                <label className='mini-title' htmlFor="shareContent">Content</label>
                <div className='inp-group'>
                  <textarea className='txtarea-tags' name="shareContent" onChange={formik.handleChange} value={ formik.values.shareContent} />
                  {formik.touched.shareContent && formik.errors.shareContent ? (
                    <div className='error-message'>{formik.errors.shareContent}</div>
                  ) : null}
                </div>
              </div>
              <div className='btn-group'>
                <button className='btn-tags' type="submit" >Submit</button>
              </div>
            </form>
          </div>
        </div>
        
    )
}

