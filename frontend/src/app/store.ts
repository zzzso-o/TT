import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/user/loginSlice'
import articleReducer from '../features/article/articleSlice'
import leftReducer from '../features/Game/LeftSlice'
import gameReducer from '../features/Game/GameSlice'
import userReducer from '../features/user/userSlice'
import meetingReducer from '../features/meeting/meetingSlice'
import profileReducer from '../features/Game/ProfileSlice'
import noticeReducer from '../features/notice/noticeSlice'
import signalSlice from '../features/Game/SignalSlice'
import monsterSlice from '../features/Game/MonsterSlice'
import roomSlice from '../features/room/RoomSlice'

//* 해당 정보를 페이지에 남도록 지속해서 저장하는 것이 아니기 때문에 sessionStorage를 이용함
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import storageSession from 'redux-persist/lib/storage/session';

//? 아직 사용법을 잘 모름
export const sessionReducers = combineReducers({
  signal : signalSlice,
  monster : monsterSlice
});

const sessionConfig = {
  key: 'signalStore',
  storage : storageSession,
};

const sessionPersistReducer = persistReducer(sessionConfig, sessionReducers);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    info: articleReducer,
    left: leftReducer,
    game: gameReducer,
    user: userReducer,
    meeting: meetingReducer,
    profile:profileReducer,
    notice: noticeReducer,
    room: roomSlice,
    session : sessionPersistReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
