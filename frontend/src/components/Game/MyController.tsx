import "./MyController.css"
import { resetSignalHistory } from "../../features/Game/SignalSlice";
import { resetMonster } from "../../features/Game/MonsterSlice";
import { useNavigate } from 'react-router-dom'
import map0 from "../../assets/music/map0.mp3"
import map2 from "../../assets/music/map2.mp3"
import map3 from "../../assets/music/map3.mp3"
import map5 from "../../assets/music/map5.mp3"
import map1 from "../../assets/music/map1.mp3"
import map4 from "../../assets/music/map4.mp3"
import playbtn from "../../assets/image/play-btn.png"
import pausebtn from "../../assets/image/pause-btn.png"
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import  { useDidMountEffect,useAppSelector,useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setAudioStatus } from "../../features/Game/GameSlice";


export default function MyController({client, gameId, dispatch} : {client : any, gameId : any, dispatch : any}) {
  const navigate = useNavigate()
  const audioStatus = useAppSelector((state: RootState) => state.game.audioStatus)
  const usedispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)
  const profileDone = useAppSelector((state:RootState) => state.game.profileDone)
  const mapStatus = useAppSelector((state:RootState) => state.game.mapStatus)
  
  useDidMountEffect(() => {
if (audioRef.current != null && audioStatus === true) {
  audioRef.current.load()
  pauseAudio()
  playAudio()
  
}}, [profileDone,mapStatus])

  const setAudioVolume = (volume: any) => {
    if (audioRef.current != null) {
    audioRef.current.volume = volume / 100
    }
  }

  const playAudio = () => {
    if (audioRef.current != null) {
      console.log('play')
      audioRef.current.play()
      usedispatch(setAudioStatus(true))
      }
  }

  const pauseAudio = () => {
    if (audioRef.current != null) {
      console.log('pause')
      audioRef.current.pause()
      usedispatch(setAudioStatus(false))
      }
  }

  function clickHandlerForExit() {
    //* redux state를 초기값으로 바꾸고 sessionStoreage를 clear() 시킴
    dispatch(resetSignalHistory());
    dispatch(resetMonster());

    //? 아직 뭔지 모르겠음
    client.unsubscribe(gameId as string);

    //! 아래의 코드가 있어야 연결을 끊음으로 이후 같은 로그가 여러 줄 뜨는 것을 방지
    client.disconnect();

    // 페이지 이동
    navigate("/about");
  }
    return (
        <div className="my-controller">
          <div id="my-controller-exit-box">
            <button className="exit-btn btn-11" id="my-controller-exit-btn"onClick={clickHandlerForExit}>
              Game Exit
            </button>
          </div>
          <div id="my-controller-control-box">

          </div>
          <div id="my-controller-bgm-box">
            <audio id="my-controller-audio-control" ref={audioRef} loop>
              {mapStatus === 0 ? <source src={map0} type="audio/mp3"/> : mapStatus === 1 ? <source src={map1} type="audio/mp3"/>:mapStatus===2 ? <source src={map2} type="audio/mp3"/>: mapStatus === 3? <source src={map3} type="audio/mp3"/>: mapStatus === 4? <source src={map4} type="audio/mp3"/> :<source src={map5} type="audio/mp3"/> }
              
              
            </audio>
            <div id="my-controller-audio-control-box">
              <img src={playbtn} alt="" id="my-controller-audio-play" className={audioStatus === false? 'on': 'off'} onClick={() => playAudio()}/>
              <img src={pausebtn} alt="" id="my-controller-audio-play" onClick={() => pauseAudio()}  className={audioStatus === true? 'on': 'off'}/>
              <input type="range" min="1" max="100" id="volume" name="volume" onChange={(event) => setAudioVolume(event.target.value)}/>   
            </div>
          </div>
          

        </div>
        
    )
}