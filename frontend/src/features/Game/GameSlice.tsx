import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
export type gameData = {
  gameId: number
  meetCode: number
  isGm: boolean
  mapStatus: number
  windowSize: number
  playerNum: number
  profileDone: boolean
  audioStatus: boolean
  statPoint: number

} 

const initialState = {
    gameId: 0,
    meetCode: 0,
    isGm: false,
    mapStatus: 0,
    windowSize: 0,
    playerNum: 0,
    profileDone: false,
    audioStatus: false,
    statPoint:0,

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state: gameData, action) => {

        },
        setMapState: (state:gameData, action) => {
            const map = action.payload.name
            console.log("받은값:",map);
            
            if (map ==='Swamp') {
                state.mapStatus = 1
            }
            if (map ==='Start') {
                state.mapStatus = 0
            }
            if (map ==='Forest') {
                state.mapStatus = 2
            }
            if (map ==='Cavern') {
                state.mapStatus = 3
            }
            if (map ==='Mountain') {
                state.mapStatus = 5
            }
            if (map ==='Devil') {
                state.mapStatus = 4
            }

            console.log("slice에서 지역 번호",state.mapStatus);
            
            
        },
        setWindowSize: (state:gameData, action) => {
            state.windowSize = action.payload
        },
        setProfileDone: (state:gameData) => {
            state.profileDone = true
        },
        setAudioStatus: (state:gameData,action) => {
            state.audioStatus = action.payload
        },
        setStatPoint: (state:gameData,action) => {
            state.statPoint += action.payload
        }

    }
})

const { reducer, actions } =gameSlice
export const {setGameState, setMapState, setWindowSize, setProfileDone, setAudioStatus, setStatPoint} = actions
export default gameSlice.reducer