import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
export type leftData = {
  divStatus: number
  playerNum: number
  playerProfile: object
} 

const initialState = {
  divStatus: 0,
  playerNum: 0,
  playerProfile: {},
}


const leftSlice = createSlice({
  name: 'left',
  initialState,
  reducers: {
    setPlayerProfile: (state:leftData, action) => {
      state.playerNum = action.payload
      state.divStatus = 1
      // axios({
      //   method: 'GET',
      //   url: '#',
      //   data: state.playerNum
      // })
      // .then( res => {
      //   state.playerProfile = res.data
      // }

      // )
    },
    setStatus: (state:leftData, action) => {
      state.divStatus = action.payload
    }
  }
})

const { reducer, actions } =leftSlice
export const {setPlayerProfile, setStatus} = actions
export default leftSlice.reducer