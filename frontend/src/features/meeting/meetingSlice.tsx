import { createSlice, current } from '@reduxjs/toolkit'

interface meetingState  {
  meetingCode: any
  meetingTitle:any
  meetingAuthor: any
  meetingDate: any
  meetingContent:any
  meetingPyNum: any
  meetingPyTime: any
  meetingGameIsStart: any
  meetingList: Array<object>
  roomCode: number
  playerList: any
  Gm: any
  participated: boolean
  gameIsStart:boolean
  totalPage:number
}

export const initialState: meetingState = {
  meetingCode: '',
  meetingTitle:'',
  meetingAuthor: '',
  meetingDate: '',
  meetingContent:'',
  meetingPyNum: '',
  meetingPyTime: '',
  meetingGameIsStart: '',
  meetingList: [],
  roomCode: 0,
  playerList: [],
  Gm: {userCode: 0,
    userEmail: "",
    userGender: "",
    userId: "",
    userNickname: "-",
    userPhone: "",},
  participated: false,
  gameIsStart: false,
  totalPage: 0,
}

export const meetingSlice = createSlice({
  
  name: 'meeting',
  initialState,
  reducers: {
    getMeetingList:(state:meetingState, action) => {
      state.meetingList = action.payload
      //console.log(state)
      console.log(state.meetingList)
    },

    getMeetingDetail: (state:meetingState, action) => {
      console.log(action.payload.pyUserResList)
      state.meetingCode = action.payload.meetingCode
      state.meetingTitle = action.payload.meetingTitle
      state.meetingContent = action.payload.meetingContent
      state.meetingAuthor = action.payload.meetingAuthor
      state.meetingDate = action.payload.meetingView
      state.meetingPyNum = action.payload.meetingPyNum
      state.meetingPyTime = action.payload.meetingPyTime
      state.roomCode = action.payload.roomInfoCode
      if (action.payload.gmUserRes != null) {
        state.Gm = action.payload.gmUserRes
      }
      else {
        state.Gm = {userCode: 0,
          userEmail: "",
          userGender: "",
          userId: "",
          userNickname: "-",
          userPhone: "",}
      }
      
      state.playerList = action.payload.pyUserResList
      state.gameIsStart = action.payload.meetingGameIsStart
      state.totalPage = action.payload.totalPages
    },

    editMeetingContent: (state:meetingState, action) => {
      state.meetingCode = action.payload.meetingCode
      state.meetingTitle = action.payload.meetingTitle
      state.meetingContent = action.payload.meetingContent
      state.meetingAuthor = action.payload.meetingAuthor
      state.meetingPyNum = action.payload.meetingPyNum
      state.meetingPyTime = action.payload.meetingPyTime
    },
    setParticipated: (state:meetingState) => {
      state.participated = true
    },
    setNotParticipated: (state:meetingState) => {
      state.participated = false
    },
    setTotalPages: (state:meetingState, action) => {
      state.totalPage = action.payload.totalPages
    }
  }
})

const { actions } = meetingSlice
export const { getMeetingList, getMeetingDetail, setParticipated,setNotParticipated, setTotalPages} = actions
export default meetingSlice.reducer
