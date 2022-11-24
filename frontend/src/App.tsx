import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { useAppDispatch } from './app/hooks';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { setWindowSize } from './features/Game/GameSlice';


function App() {
  useEffect(() => {dispatch(setWindowSize(window.innerWidth))}, [window.innerWidth])
  const token = useAppSelector((state:RootState) => state.login.token)
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   if (token){
  //     dispatch(getAccessToken())
  //   }
   
  // },[token])

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
