import DiceBox from '@3d-dice/dice-box'
import { useEffect, useState } from 'react';
import { useAppSelector } from "../../app/hooks"
import DiceResultModal from './DiceResultModal';

import "./RollADice.css";
import "./DiceResultModal.css";
import axios from "axios"


function RollADice({client, gameId}) {
  //* 주사위 갯수
  const [diceNum, setDiceNum] = useState(0);
  //* 주사위 상태
  const [ Dice, setDice ] = useState(null)
  //* 결과값을 보여주는 모달창
  const [modalOpen, setModalOpen] = useState(false);
  //* 모달창에 전달할 결과값
  const [result, setResult] = useState('');
  //* 주사위 던지는 캐릭터 이름
  const [currCharName, setCurrCharName] = useState('');
  //* 현재 플레이어의 유저 코드
  const currentUserCode = localStorage.getItem('userCode')

  useEffect(() => {
    axios({
      method:'GET',
      url: '/api' + `/player/${currentUserCode}`
    })
    .then((res) => {
      console.log(res.data);
      console.log(res.data.playerName);
      setCurrCharName(res.data.playerName);
    })
  }, [])

  //* 주사위 굴리는 위치 랜더링
  useEffect(() => {
    const makedDice = new DiceBox(
      "#dice-box", // target DOM element to inject the canvas for rendering
      {
        id: "dice-canvas", // canvas element id
        assetPath: "/assets/dice-box/",
        startingHeight: 8,
        throwForce: 6,
        spinForce: 5,
        lightIntensity: 0.9,
        scale: 9, //* 주사위 크기,
        theme: 'rock', //* 주사위 테마
        // themeColor: '#d9aa52' //* 테마 컬러
        // themeColor: '#ffc860'
        themeColor: '#a6a6a6'
      }
    );

    makedDice.init().then(() => {
      setDice(makedDice);
      setModalOpen(false);
    });
  }, [])

  //* 주사위 굴리기
  const rollDice = (notation, group) => {
    // save which attribute we're rolling for
    // trigger the dice roll
    // 테스트 출력
    // console.log("주사위 갯수", notation); 
    let diceStat = `${notation}d6`;
    Dice.show().roll(diceStat);

      /**
     * * 주사위 다 굴린 이후하는 행동
     * @param {*} results 
     */
    Dice.onRollComplete = (results) => {
      // 테스트 출력
      console.log("굴린 주사위 배열", results[0].rolls);
      const diceArray = results[0].rolls;
      let diceResult = 0;
      for (const diceValue of diceArray) {
        diceResult += diceValue.value;
      }
      // 테스트 출력  
      console.log("굴린 결과값", diceResult);
      console.log(currCharName);

      const diceSum = {
        charName : currCharName,
        diceResult : diceResult,
        diceCnt : diceArray.length
      }

      //* 주사위 로그 출력
      client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(diceSum), {id : gameId});
      //! 주의 dice-ui는 설치하지 말것
      setResult(`총 ${diceResult}값이 나왔습니다`);
      setModalOpen(true);
    }
  };

  /**
   * * 주사위 몇 개 굴릴 것인지 input
   * @param {*} e 
   */
  function handleInputAboutDiceNum(e) {
    setDiceNum(e.target.value);
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div id='dice-component'>
      <h1 id='dice-title'>Dice Of Fate</h1>
      <div id="dice-box"></div>
      <hr />
      <div id='click-box'>
      <input type="text" id="dice-num" onChange={handleInputAboutDiceNum} />
      <button className="dice-btn" onClick={() => rollDice(diceNum)}>Rolling!</button>
      </div>
      <DiceResultModal open={modalOpen} close={closeModal} result={result} header="Modal heading" />
    </div>
  )
}

export default RollADice;