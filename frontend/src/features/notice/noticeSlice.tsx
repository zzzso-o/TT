import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

interface noticeState  {
    noticeCode: any
    noticeTitle:any
    noticeContent:any
    noticeAuthor: any
    noticeList: Array<object>
}

export const initialState: noticeState = {
    noticeCode: '',
    noticeTitle:'',
    noticeContent:'',
    noticeList: [],
    noticeAuthor: '',
}
const DOMAIN = "http://localhost:8080/"

export const noticeSlice = createSlice({
  
    name: 'notice',
    initialState,
    reducers: {
      getNoticeList:(state:noticeState, action) => {
        state.noticeList = action.payload
        //console.log(state)
        // console.log(state.noticeList)
      },

      getNoticeDetail: (state:noticeState, action) => {
        state.noticeCode = action.payload.noticeCode
        state.noticeTitle = action.payload.noticeTitle
        state.noticeContent = action.payload.noticeArticle
        state.noticeAuthor = action.payload.noticeAuthor
      },

      editNoticeContent: (state:noticeState, action) => {
        state.noticeCode = action.payload.noticeCode
        state.noticeTitle = action.payload.noticeTitle
        state.noticeContent = action.payload.noticeContent
        state.noticeAuthor = action.payload.noticeAuthor
      }
    }
  })

        // getArticleList:( method, url)=> {
        //   axios({
        //     method: 'GET',
        //     url: DOMAIN + url,
        //   })
        //     .then((res) => {
        //       console.log(res)
        //       initialState.shareList = res.data})
        //     .catch((err) => console.log(err));
        // },


const { actions } = noticeSlice
export const { getNoticeList, getNoticeDetail, editNoticeContent } = actions
export default noticeSlice.reducer