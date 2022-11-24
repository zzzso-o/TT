import React, { useRef } from "react";
import styles from './About.module.css'
import './About.module.css'
import TTabout from "../assets/image/TTabout.png"
import Party from "../assets/image/aboutparty.jpg"
import Play from "../assets/image/aboutplay.jpg"
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../components/useIntersectionObserver";
import Navbar from "../components/Navbar";

export default function About() {
  const navigate = useNavigate()
  const target = useRef(null)

  useIntersectionObserver(target, styles.Animation)



  return (
    <div id={styles.About}>
      <Navbar />
      <div className={styles.Content}>
        <div className={styles.Title}>ABOUT TRPG</div>
        <div className={styles.One} ref={target}>
          <img className={styles.TTabout} src={TTabout} alt="TTabout" />
          <div className={styles.Explainone}>
            <p>TRPG는 Tabletalk Role Playing Game의 줄임말로,</p>
            <p>테이블에 둘러 앉아 각자가 맡은 역할을 연기하며 스토리를 전개해 나가는 게임입니다.</p> 
            <p>룰북에 따라 게임을 진행하고, 특정 이벤트가 발생하면 주사위를 굴려 모든 것을 결정합니다.</p>
            <p>게임 마스터 (GM)은 게임의 진행자로서 이야기의 판과 큰 틀을 제시하고, 플레이어들의 결정을 반영하여 이야기를 이끌어 나갑니다.</p>
            <p>플레이어는 마스터의 설명에 반응하여 각자 자신의 캐릭터가 된 것처럼 대사와 행동 묘사를 하며 역할극을 수행합니다.</p>
          </div>
        </div>
        <div className={styles.One} ref={target}>
          <div className={styles.Explaintwo}>
            <p>TRPG를 해보고 싶지만</p>
            <p>함께 플레이 할 사람을 찾기 힘드셨나요?</p>
            <p>TT에서 파티원을 구해보세요.</p>
            <p>GM도, Player도 모두 구하실 수 있습니다.</p> 
          </div>
          <img className={styles.TTabout} src={Party} alt="aboutparty" />
        </div>
        <div className={styles.One} ref={target}>
          <img className={styles.TTabout} src={Play} alt="aboutplay" />
          <div className={styles.Explainone}>
            <p>룰이 많고 복잡해서 게임 플레이에 어려움이 있으셨나요?</p>
            <p>TT에서는 모두가 즐길 수 있는</p>
            <p>간편한 룰과 편의성을 제공합니다.</p>
          </div>
        </div>
        <div className={styles.Aboutfooter} ref={target}>
          <div className={styles.Explainfoot}>지금 바로 시작하세요</div>
          <button className={styles.Btn} onClick={() => {navigate('/meeting')}}>TT 시작하기</button>
        </div>
      </div>
    </div>
);
}