import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

interface articleState  {
    shareCode: any
    shareTitle: any
    shareContent: any
    shareAuthor: any
    shareLike: any
    shareView: any
    shareList: Array<object>
}

export const initialState: articleState = {
    shareCode: '',
    shareTitle:'',
    shareContent:'',
    shareList: [],
    shareAuthor: '',
    shareLike: 0,
    shareView: 0
}
const DOMAIN = "http://localhost:8080/"

export const articleSlice = createSlice({
  
    name: 'article',
    initialState,
    reducers: {
      getArticleList:(state:articleState, action) => {
        state.shareList = action.payload
        //console.log(state)
        // console.log(state.shareList)
      },

      getArticleDetail: (state:articleState, action) => {
        state.shareCode = action.payload.shareCode
        state.shareTitle = action.payload.shareTitle
        state.shareContent = action.payload.shareContent
        state.shareAuthor = action.payload.shareAuthor
        state.shareLike = action.payload.shareLike
        state.shareView = action.payload.shareView
      },

      editContent: (state:articleState, action) => {
        state.shareCode = action.payload.shareCode
        state.shareTitle = action.payload.shareTitle
        state.shareContent = action.payload.shareContent
        state.shareAuthor = action.payload.shareAuthor
        state.shareLike = action.payload.shareLike
        state.shareView = action.payload.shareView
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


const { actions } = articleSlice
export const { getArticleList, getArticleDetail, editContent } = actions
export default articleSlice.reducer