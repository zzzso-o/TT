import React, {useEffect} from 'react'
import { Formik, useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getMeetingDetail }  from '../../features/meeting/meetingSlice';
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../ArticleCreate.css'
import Navbar from '../../components/Navbar';

type meetingType = {
  meetingAuthor: string,
  meetingCode: string,
  meetingTitle: string,
  meetingContent: string,
  meetingPyNum: string,
  meetingPyTime: string
}

export default function MeetingEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId

  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
      axios({ 
        method: 'GET',
        url: '/api' + `/meeting/${articleId}`
      })
        .then((res) => {
          dispatch(getMeetingDetail(res.data))
        })
        .catch(err => {
          console.error(err.response.data)
        })
  })
  
  const title = useSelector((state:RootState ) => state.meeting.meetingTitle)
  const content = useSelector((state:RootState) => state.meeting.meetingContent)
  const author = useSelector((state:RootState) => state.meeting.meetingAuthor)
  const code = useSelector((state:RootState) => state.meeting.meetingCode)
  const player = useSelector((state:RootState) => state.meeting.meetingPyNum)
  const time = useSelector((state:RootState) => state.meeting.meetingPyTime)
  // const position = useSelector((state:RootState) => state.meeting.meetingPosition)



  const meetingEditRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then(res => {
        console.log(res)
        navigate(`/meeting/${articleId}`,)
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:articleId, meetingTitle: title, meetingContent: content, meetingPyNum: player, meetingPyTime: time, meetingAuthor: author,meetingPosition: 0 },
    onSubmit: (data) => {
      console.log(data)
      meetingEditRequest('PUT', '/api' + `/meeting/${articleId}`, data)
    }
  })


  return (
        <div id='edit'>
          <Navbar />
          <div className='create-container'>
            <h1>MeetingEdit</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className='rows'>
                <label className='mini-title' htmlFor="meetingTitle">Title</label>
                <div className='inp-group'>
                  <input className='inp-tags' type="text" onChange={ formik.handleChange } id="meetingTitle" defaultValue={title} />
                </div>
              </div>
                <div className='rows'>
                  <label className='mini-title' htmlFor="meetingPyNum">Player Number</label>
                  <div className='inp-group'>
                    <input className='inp-tags' type="number" min="2" max="6" onChange={ formik.handleChange } id="meetingPyNum" defaultValue={player} />
                  </div>
                </div>
                <div className='rows'>
                  <label className='mini-title' htmlFor="meetingTime">Play Time</label>
                  <div className='inp-group'>
                    <input className='inp-tags' type="datetime-local" onChange={ formik.handleChange } id="meetingPyTime" defaultValue={time} />
                  </div>
                </div>
                <div className="rows">
                <label className="mini-title" htmlFor="meetingPosition">Position</label>
                <div className="radio-group">
                  <div className="position-choice">
                    <input className="radio-btn" id="gmPlayer" type="radio" name="meetingPosition" onChange={formik.handleChange} value={0}/>
                    <label htmlFor="gmPlayer" className="choice">GM</label>
                  </div>
                  <div className="position-choice">
                    <input className="radio-btn" id="justPlayer" type="radio" name="meetingPosition" onChange={formik.handleChange} value={1}/>
                    <label htmlFor="justPlayer" className="choice">Player</label>
                  </div>
                  {/* {formik.touched.meetingPosition && formik.errors.meetingPosition ? (
                    <div className='error-message'>{formik.errors.meetingPosition}</div>
                  ) : null} */}
                </div>
              </div>
                <div className='rows'>
                  <label className='mini-title' htmlFor="meetingContent">Content</label>
                  <div className='inp-group'>
                    <textarea className='txtarea-tags' onChange={ formik.handleChange } id="meetingContent" defaultValue={content} />
                  </div>
                </div>
              <div className='btn-group'>
                <button className='btn-tags' type="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
        
    )
}