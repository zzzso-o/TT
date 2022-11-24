import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getNoticeDetail }  from '../../features/notice/noticeSlice';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import '../ArticleDetail.css'
import Navbar from '../../components/Navbar';

export default function NoticeDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  const user_authority = window.localStorage.getItem('user_authority');

  function checkAdmin() {
    // const showCreateKey = bcrypt.hashSync('rule_admin', 12);
    // return bcrypt.compareSync(showCreateKey, user_authority);
    return user_authority === 'rule_admin';
  }

  function onClickUpdScrn() {
    window.location.replace("edit/" + `${articleId}`)
  }

  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
    axios({ 
      method: 'GET',
      url: '/api' + `/notice/${articleId}`
    })
      .then((res) => {
        console.log(res.data)
        dispatch(getNoticeDetail(res.data))

      })
      .catch(err => {
        console.error(err.response.data)
      })
})
const noticeDeleteRequest: any = (method: string, url: string, data:object) => {
  return axios({
    method,
    url: DOMAIN + url
    // data: {
    //   noticeCode: articleId,
    // },
  })
    .then(res => {
      console.log(res.data)
      navigate('/notice')
    })
    .catch(err => {
      console.error(err.reponse.data)
    })
}

const title = useSelector((state:RootState ) => state.notice.noticeTitle)
const content = useSelector((state:RootState) => state.notice.noticeContent)
const author = useSelector((state:RootState) => state.notice.noticeAuthor)

const formik = useFormik({
  initialValues: {noticeCode:articleId},
  onSubmit: (data) => {
    console.log(data)
    noticeDeleteRequest('DELETE', '/api' + `/notice/${articleId}`, data)}
  })
  
  console.log(content)
    return (
<div id='detail'>
<Navbar />
          <div className='detail-container'>
            <h1 className='detail-title'>{title}</h1>
            <form action="" onSubmit={formik.handleSubmit} className="detail-form">
              <div className='author-views'>
                <div className='postedby'>
                  <label className='author-tag' htmlFor="shareAuthor">POSTED BY | </label>
                  <div className='author-name'>
                    {author}
                  </div>
                </div>
                {/* <div className='views'>
                  <label className='view-tag' htmlFor="shareView">VIEWS | </label>
                  <div className='view-cnt'>
                    {view}
                  </div>
                </div> */}
              </div>
              <div className='detail-rows'>
                <div className='content-part'>
                  {content}
                </div>
              </div>
              {
              checkAdmin() ?  
              <div className='detail-btn-group'>
                <button className='detail-btn' onClick={onClickUpdScrn} type="button">edit</button>
                <button className='detail-btn' type='submit'>delete</button>
              </div>
              :
              null
            }
            </form>
          </div>
        </div>
        
    )
}