import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { StringSchema } from 'yup'
import { warrior } from '../../components/Game/ProfileInfoList'
export type profileData = {
  playerUserCode: number
  playerSpecies: string
  playerName: string
  playerLook: string
  playerValue: string
  playerWeapon: string
  playerArmor: string
  playerHP: number
  playerSup1: number
  playerSup2: number
  playerSup3: number
  playerstat1: number
  playerstat2: number
  playerstat3: number
  playerstat4: number
  playerstat5: number
  playerstat6: number
  class_name: string
  skill1: string
  skill2: string
  skill3: string
  chooseLevel: number
  jobInfo: object
  playerClass: string
  playerMaxHp: number

} 

const initialState = {
  playerUserCode: 0,
  playerSpecies: '',
  playerName: '',
  playerLook: '',
  playerValue: '',
  playerWeapon: '',
  playerArmor: '',
  playerHP: 0,
  playerSup1: 0,
  playerSup2: 0,
  playerSup3: 0,
  playerstat1: 0,
  playerstat2: 0,
  playerstat3: 0,
  playerstat4: 0,
  playerstat5: 0,
  playerstat6: 0,
  class_name: '',
  skill1: '',
  skill2: '',
  skill3: '',
  chooseLevel: 0,
  jobInfo: warrior,
  playerClass: 'warrior',
  playerMaxHp: 0

}

const profileSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
      addChooseLevel: (state:profileData) => {
        console.log(state.chooseLevel)
        state.chooseLevel += 1
      },
      subtractChooseLevel: (state:profileData) => {
        console.log(state.chooseLevel)
        state.chooseLevel -= 1
      },
      setJobInfo: (state:profileData, action) => {
        state.jobInfo = action.payload
      },
      getPlayerProfile: (state:profileData, action) => {
        console.log('done')
        console.log(action.payload)
        state.playerUserCode = action.payload.playerUserCode
        state.playerSpecies = action.payload.playerSpecies
        state.playerName = action.payload.playerName
        state.playerLook = action.payload.playerLook
        state.playerValue = action.payload.playerValue
        state.playerWeapon = action.payload.playerWeapon
        state.playerArmor = action.payload.playerArmor
        state.playerHP = action.payload.playerHP
        state.playerSup1 = action.payload.playerSup1
        state.playerSup2 = action.payload.playerSup2
        state.playerSup3 = action.payload.playerSup3
        state.playerstat1 = action.payload.playerStat1
        state.playerstat2 = action.payload.playerStat2
        state.playerstat3 = action.payload.playerStat3
        state.playerstat4 = action.payload.playerStat4
        state.playerstat5 = action.payload.playerStat5
        state.playerstat6 = action.payload.playerStat6
        state.skill1 = action.payload.playerSkill1
        state.skill2 = action.payload.playerSkill2
        state.skill3 = action.payload.playerSkill3
        state.playerClass = action.payload.playerClassName
        state.playerMaxHp = action.payload.playerMaxHP
      }
        
    }
})

const { reducer, actions } =profileSlice
export const {addChooseLevel, subtractChooseLevel,setJobInfo,getPlayerProfile} = actions
export default profileSlice.reducer