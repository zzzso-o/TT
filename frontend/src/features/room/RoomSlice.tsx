import { createSlice } from '@reduxjs/toolkit'

interface roomState {
  roomCode: any
  gmUserCode: any
  py1Code: any
  py2Code: any
  py3Code: any
  py4Code: any
  py5Code: any
  isGm: boolean
}


export const initialState: roomState = {
  roomCode: '',
  gmUserCode: '',
  py1Code: '',
  py2Code: '',
  py3Code: '',
  py4Code: '',
  py5Code: '',
  isGm: false,
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRoomInfo: (state:roomState, action) => {
      console.log('실행중' + action.payload.py1Code)
      state.gmUserCode = action.payload.gmUserCode
      state.py1Code = action.payload.py1Code
      state.py2Code = action.payload.py2Code
      state.py3Code = action.payload.py3Code
      state.py4Code = action.payload.py4Code
      state.py5Code = action.payload.py5Code
      
    },
    setGmCondition: (state:roomState, action) => {
      state.isGm = action.payload
    }
  }
})


const {actions} = roomSlice
export const {getRoomInfo,setGmCondition} = actions
export default roomSlice.reducer