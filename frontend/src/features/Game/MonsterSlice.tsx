import { createSlice } from '@reduxjs/toolkit'
/*
store는 state를 저장하는 장소
state는 상태 저장
action는 state에 저장된 값을 변경시키는 방식
reducer가 state를 변환시키는 함수
*/

type monsterType = {
    mapArea : number;
    monsterId : number;
    monsterNum : number;
}

const initialState = {} as monsterType;

/**
 * * 새로고침해도 로그를 남기기 위해 redux 도입
 * ? 아직 사용법을 잘 모름
 */
const monsterSlice = createSlice({
    name: 'monster',
    // 초기값
    initialState: initialState,
    //* state를 변환시키는 함수
    reducers: {
        //* state가 기존에 저장한 값
        //* action.payload안에 새로운 로그 값이 들어옴
        setMonster: (state : monsterType, action) => {
            // 테스트 출력
            console.log("세션에 저장할 값 - 몬스터 정보: ", action.payload);
            
            state.mapArea = action.payload.mapArea;
            state.monsterId = action.payload.monsterId;
            state.monsterNum = action.payload.monsterNum;
        },
        resetMonster: (state : monsterType) => {
            //? 이전 로그 초가화 방식 -> 이렇게 해도 logHistory div가 남았었음
            // state = initialState

            //* 몬스터 정보 초기화- monsterInfo 비움
            state.mapArea = 0;
            state.monsterId = 0;
            state.monsterNum = 0;
            sessionStorage.clear()
        }
    }
})

// Action creators are generated for each case reducer function
const { reducer, actions } = monsterSlice
export const {setMonster, resetMonster} = actions
export default monsterSlice.reducer