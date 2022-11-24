import { useAppDispatch } from "../../../app/hooks"
import { setPlayerProfile, setStatus } from "../../../features/Game/LeftSlice"
import "./GameButtons.css"
import { useAppSelector } from "../../../app/hooks"
import { RootState } from "../../../app/store"
export default function GameButtons() {
  const py1Code = useAppSelector((state:RootState) => state.room.py1Code)
  const py2Code = useAppSelector((state:RootState) => state.room.py2Code)
  const py3Code = useAppSelector((state:RootState) => state.room.py3Code)
  const py4Code = useAppSelector((state:RootState) => state.room.py4Code)
  const isGm = useAppSelector((state:RootState) => state.room.isGm)
  const py5Code = useAppSelector((state:RootState) => state.room.py5Code)
  const dispatch = useAppDispatch()
  const setPlayerNum: any = (num: number) => {
      dispatch(setPlayerProfile(num))
    }
  const setDivStatus: any = (num:number) => {
    dispatch(setStatus(num))
  }
  const test: any = () => {
  }
  return (
      <div id="button-box">
        {py1Code != ''?<button id="player-one" className="left-button" onClick={() => setPlayerNum(1)}>1</button>:null}
        {py2Code != ''?<button id="player-two" className="left-button" onClick={() => setPlayerNum(2)}>2</button>:null}
        {py3Code != ''?<button id="player-three" className="left-button" onClick={() => setPlayerNum(3)}>3</button>:null}
        {py4Code != ''?<button id="player-four" className="left-button" onClick={() => setPlayerNum(4)}>4</button>:null}
        {py5Code != ''?<button id="player-five" className="left-button" onClick={() => setPlayerNum(5)}>5</button>:null}
        <button id="player-five" className="left-button" onClick={() => setDivStatus(2)}>Map</button>
        {/* <button id="player-five" className="left-button" onClick={() => setDivStatus(3)}>Item</button> */}
        <button id="player-five" className="left-button" onClick={() => setDivStatus(4)}>Mon</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(5)}>Rule</button>
        {/* <button id="player-five" className="left-button" onClick={() => setDivStatus(6)}>확인용 버튼 - MonsterStage</button> */}
        <button id="dice-roll" className="left-button" onClick={() => setDivStatus(7)}>Dice</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(0)}>Home</button>
        <button className="left-button" id={isGm? "gm-btn-on":"gm-btn-off"} onClick={() => setDivStatus(99)}>GM</button>
      </div>
        
    )
}
