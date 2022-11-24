import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getMeetingList, setTotalPages } from '../../features/meeting/meetingSlice'
import '../BoardList.css'
import Navbar from '../../components/Navbar';
import { useSelector } from "react-redux"
import Pagination from '@mui/material/Pagination';



const MeetingList = () => {
  const navigate = useNavigate()
  const token = useSelector((state:RootState) => state.login.token)
  const DOMAIN = "http://localhost:8080/" 
  const dispatch = useAppDispatch()
  const totalPages = useAppSelector((state:RootState) => state.meeting.totalPage)

  const doPagination = (e:any, p:any) => {
    axios({
      method: 'GET',
      url: '/api' + '/meeting/paging/' +`${p - 1}`
    })
      .then((res) => {
        console.log(res.data)
        setMeetList(res.data.content)
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }
  
  const [meetList, setMeetList] = useState([{
    meetingCode: '',
    meetingTitle: '',
    meetingContent: '',
    meetingAuthor: '',
    meetingPYNum:'',
    meetingPyTime:'',
    meetingDate:''
  }])
  
  // 검색 기능
  const [search, setSearch] = useState('')

  const onChangeSearch = (e : any) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onSearch = (e : any) => {
    e.preventDefault();
    if (search === null || search === '') {
      axios({
        method: 'GET',
        url: '/api' + '/meeting'
      })
      .then((res) => {
        console.log(1, res)
        setMeetList(res.data)
      })
    }
    else {
      const filterData = meetList.filter((row) => row.meetingTitle.includes(search))
      setMeetList(filterData)
    }
    setSearch('')
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api' + '/meeting/paging/0'
    })
      .then((res) => {
        console.log(res.data)
        setMeetList(res.data.content)
        dispatch(setTotalPages(res.data))
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }, [])


    // datetime format


    return (
      <div id='container'>
        <Navbar />
        <h1>MEETING</h1>
        <div id='articles'>
          <div id='search'>
            <div className='search-group'>
              <form className='search-form' onSubmit={e => onSearch(e)}>
                <button id='search-btn' type='submit'>search</button>
                <input id='search-input' type="text" value={search} onChange={onChangeSearch} />
              </form>

            </div>
            {token === '' ? null :
            <div>
              <button id='create-btn' onClick={() => navigate('/meeting/create')}>create</button>
            </div>}
          </div>
          
          <table className='board-table'>
            <thead>
              <tr>
                <th scope="col" id='number'>NUMBER</th>
                <th scope="col" id='title'>TITLE</th>
                <th scope="col" id='name'>NAME</th>
              </tr>
            </thead>
            <tbody>
          {meetList.slice(0).map((meet : any, idx : number) => {
              return (
                  <tr className='list-names' key={idx} onClick={() => navigate('/meeting/'+`${meet.meetingCode}`)}>
                      <td>
                        {meetList.length - idx}
                      </td>
                      {/* <td><Link to={"/meeting/" + `${meet.meetingCode}`} style={{ textDecoration: 'none', color: '#d9aa52' }}>{meet.meetingTitle}</Link></td> */}
                      <td>{meet.meetingTitle}</td>
                      <td>
                        {meet.meetingAuthor}
                      </td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
        <Pagination count={totalPages} variant="outlined" color="primary" onChange={(e,p) => doPagination(e,p)} id="meeting-pag"/>

        </div>
        
    )
}

export default MeetingList;