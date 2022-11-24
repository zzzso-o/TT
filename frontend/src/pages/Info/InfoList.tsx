import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticleList }  from '../../features/article/articleSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { RootState } from '../../app/store';
import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import { info } from 'console';
import { isFocusable } from '@testing-library/user-event/dist/types/utils';
import { useNavigate } from 'react-router-dom';
import '../BoardList.css'
import Navbar from '../../components/Navbar';

// const DOMAIN = "http://localhost:8080/"
const InfoList = () => {
  const token = useSelector((state:RootState) => state.login.token)
  
  const dispatch = useAppDispatch()
  const [shareList, setList] = useState([{
    shareCode: '',
    shareTitle: '',
    shareContent: '',
    shareAuthor: '',
    shareLike:'',
    shareView:''
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
        url: '/api' + '/share'
      })
      .then((res) => {
        console.log(1, res)
        setList(res.data)
      })
    }
    else {
      const filterData = shareList.filter((row) => row.shareTitle.includes(search))
      setList(filterData)
    }
    setSearch('')
  }
  useEffect(() => {
      axios({ 
        method: 'GET',
        url: "/api" + "/share"
      })
        .then((res) => {
          // console.log(shareList)
          setList(res.data)
          //dispatch(getArticleList(res.data))
          // console.log(res.data)
        })
        .catch(err => {
          console.error(err.response.data)
        }) 
  }, [])


  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit



  const navigate = useNavigate()
  // const list = useSelector((state:RootState) => state.info.shareList)
  return (
    <div id='container'>
        <Navbar />
        <h1>INFORMATION</h1>
        <div id='articles'>
          <div id='search'>
            <div className='search-group'>
            <form className='search-form' onSubmit={e => onSearch(e)}>
              <button id='search-btn' >search</button>
              <label htmlFor=""></label>
              <input id='search-input' type="text" value={search} onChange={onChangeSearch}/>
            </form>
            </div>
            {token === '' ? null :
            <div>
              <button id='create-btn' onClick={() => navigate('/share/create')}>create</button>
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
          {shareList.map((share : any, idx: number) => {
              return (
                  <tr className='list-names' key={idx} onClick={() => navigate('/share/'+`${share.shareCode}`)}>
                      <td>
                        {shareList.length - idx}
                      </td>
                      <td>{share.shareTitle}</td>
                      <td>
                        {share.shareAuthor}
                      </td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
      </div>
      
  )
}


export default InfoList;