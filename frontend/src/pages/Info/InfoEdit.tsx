import React, {useEffect} from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { Formik, useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getArticleDetail }  from '../../features/article/articleSlice';
import '../ArticleCreate.css'
import * as Yup from 'yup'
import Navbar from '../../components/Navbar';

export default function InfoEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  const DOMAIN = "http://localhost:8080/"
  


  useEffect(() => {
      axios({ 
        method: 'GET',
        url: '/api' + `/share/${articleId}`
      })
        .then((res) => {
          dispatch(getArticleDetail(res.data))
        })
        .catch(err => {
          console.error(err.response.data)
        })
  })
  
  const title = useSelector((state:RootState ) => state.info.shareTitle)
  const content = useSelector((state:RootState) => state.info.shareContent)
  const author = useSelector((state:RootState) => state.info.shareAuthor)
  const code = useSelector((state:RootState) => state.info.shareCode)




  const shareEditRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: url,
      data: data,
    })
      .then(res => {
        console.log(res.data)
        navigate(`/share/${articleId}`,)
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }

  const formik = useFormik({
    initialValues: {shareCode:articleId, shareTitle: title, shareContent: content},
    validationSchema: Yup.object({
      shareTitle: Yup.string()
        .required('제목을 입력해주세요.')
        .max(30, '30자를 초과할 수 없습니다.'),

      shareContent: Yup.string()
        .required('내용을 입력해주세요.')
        .max(1000, '1000자를 초과할 수 없습니다.')
    }),
    onSubmit: (data) => {
      console.log(data)
      shareEditRequest('PUT', '/api' + `/share/${articleId}`, data)}
  })

  
    return (
        <div id='edit'>
          <Navbar />
          <div className='create-container'>
            <h1>InfoEdit</h1>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className='rows'>
                <label className='mini-title' htmlFor='shareTitle'>Title</label>
                <div className='inp-group'>
                  <input className='inp-tags' type="text" onChange={formik.handleChange} id="shareTitle" defaultValue={title} />
                  {/* {formik.touched.shareTitle && formik.errors.shareTitle ? (
                    <div className='error-message'>{formik.errors.shareTitle}</div>
                  ) : null} */}
                </div>           
              </div>
              <div className='rows'>
                <label className='mini-title' htmlFor="shareContent">Content</label>
                  <div className='inp-group'>
                    <textarea className='txtarea-tags' onChange={formik.handleChange} id="shareContent" defaultValue={content} />
                    {/* {formik.touched.shareContent && formik.errors.shareContent ? (
                    <div className='error-message'>{formik.errors.shareContent}</div>
                  ) : null} */}
                  </div>
              </div >
              <div className='btn-group'>
                <button className='edit-btn-tags' type="submit">submit</button>
                <button className='edit-btn-tags' onClick={() => navigate('/share')}>cancle</button>
              </div>
            </form>
          </div>
        </div>
    )
}