import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import '../ArticleCreate.css'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Navbar from '../../components/Navbar';


export default function NoticeCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()
  const userNickname = useAppSelector((state: RootState) => state.user.userNickname)

  const noticeRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then(res => {
        console.log(res.data)
        navigate('/notice')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {noticeTitle:'', noticeArticle: '', noticeAuthor:''},
    validationSchema: Yup.object({
      noticeTitle: Yup.string()
        .required('제목을 입력해주세요.')
        .max(30, '30자를 초과할 수 없습니다.'),

      noticeArticle: Yup.string()
        .required('내용을 입력해주세요.')
        .max(1000, '1000자를 초과할 수 없습니다.')
    }),
    onSubmit: (data) => {
      formik.values.noticeAuthor = userNickname
      console.log(data)
      {noticeRegisterRequest('POST', '/api' + '/notice', data)}
    }
  })

    return (
      <div id='create'>
      <Navbar />
      <div className='create-container'>
          <h1>NoticeCreate</h1>
        <form action="" onSubmit={ formik.handleSubmit }>
          <div className='rows'>
            <label className='mini-title' htmlFor='noticeTitle'>Title</label>
            <div className='inp-group'>
              <input className='inp-tags' name='noticeTitle' type='text' onChange={formik.handleChange} value={formik.values.noticeTitle} />
              {formik.touched.noticeTitle && formik.errors.noticeTitle ? (
                <div className='error-message'>{formik.errors.noticeTitle}</div>
              ) : null}
            </div>           
          </div>
          <div className='rows'>
            <label className='mini-title' htmlFor="noticeArticle">Content</label>
            <div className='inp-group'>
              <textarea className='txtarea-tags' name="noticeArticle" onChange={formik.handleChange} value={ formik.values.noticeArticle} />
              {formik.touched.noticeArticle && formik.errors.noticeArticle ? (
                <div className='error-message'>{formik.errors.noticeArticle}</div>
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