import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/User/SignUp';
import LogIn from './pages/User/LogIn';
import GameView from './pages/GameView';
import Profile from './pages/User/Profile';
import MeetingList from './pages/Meeting/MeetingList';
import MeetingCreate from './pages/Meeting/MeetingCreate';
import MeetingEdit from './pages/Meeting/MeetingEdit';
import MeetingDetail from './pages/Meeting/MeetingDetail';
import NoticeList from './pages/Notice/NoticeList';
import NoticeCreate from './pages/Notice/NoticeCreate';
import NoticeEdit from './pages/Notice/NoticeEdit';
import NoticeDetail from './pages/Notice/NoticeDetail';
import InfoList from './pages/Info/InfoList';
import InfoCreate from './pages/Info/InfoCreate';
import InfoEdit from './pages/Info/InfoEdit';
import InfoDetail from './pages/Info/InfoDetail';
import About from './pages/About'
import Home from './components/Home';

// 렌더링시 스크롤의 위치를 맨 위로 옮겨주는 컴포넌트
import ScrollToTop from './components/ScrollRestoration';

//* 새로고침해도 로그가 유지되기 위해서 persist 도입
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/game/:gameId" element={<GameView />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path="/meeting" element={<MeetingList />}></Route>
          <Route path="/meeting/create" element={<MeetingCreate />}></Route>
          <Route path="/meeting/edit/:articleId" element={<MeetingEdit />}></Route>
          <Route path="/meeting/:articleId" element={<MeetingDetail />}></Route>
          <Route path="/notice" element={<NoticeList />}></Route>
          <Route path="/notice/create" element={<NoticeCreate />}></Route>
          <Route path="/notice/edit/:articleId" element={<NoticeEdit />}></Route>
          <Route path="/notice/:articleId" element={<NoticeDetail />}></Route>
          <Route path="/share" element={<InfoList />}></Route>
          <Route path="/share/create" element={<InfoCreate />}></Route>
          <Route path="/share/edit/:articleId/" element={<InfoEdit />}></Route>
          <Route path="/share/:articleId" element={<InfoDetail />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes> 
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
