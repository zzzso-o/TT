import './MonsterStage.css'
import kobolt from '../../assets/image/monster/kobolt.png'
import kokatris from '../../assets/image/monster/kokatris.png'
import dwarf from '../../assets/image/monster/dwarf.png'
import bugman from '../../assets/image/monster/bugman.png'
import minotauros from '../../assets/image/monster/minotauros.png'
import domabaemman from '../../assets/image/monster/domabaemman.png'
import griffin from '../../assets/image/monster/griffin.png'
import jihain from '../../assets/image/monster/jihain.png'
import chaindevil from '../../assets/image/monster/chaindevil.png'
import fish from '../../assets/image/monster/fish.png'
import crocodile from '../../assets/image/monster/crocodile.png'
import ogre from '../../assets/image/monster/ogre.png'
import spiderking from '../../assets/image/monster/spiderking.png'
import devil from '../../assets/image/monster/devil.png'
import dragon from '../../assets/image/monster/dragon.png'
import koatle from '../../assets/image/monster/koatle.png'
import chaos from '../../assets/image/monster/chaos.png'
import otuge from '../../assets/image/monster/otuge.png'
import angel from '../../assets/image/monster/angel.png'
import enddragon from '../../assets/image/monster/enddragon.png'


type monsterStateType =  {
  mapArea: number;
  monsterId: number;
  monsterNum: number;
}

export default function MonsterStage({monsterState} : {monsterState : monsterStateType}) {
  // 함수 작성
  // 지역에 따른 몬스터 종류
  const monsterKind = new Map();
  monsterKind.set(1, ["","코볼트", "도마뱀인간", "거대악어", "코아틀"]);
  monsterKind.set(2, ["","코카트리스", "그리폰", "오거", "혼돈의 즙"]);
  monsterKind.set(3, ["","드워프 전사", "지하인", "거미왕", "오튜그"]);
  monsterKind.set(4, ["","인면충", "사슬악마", "가시악마", "천사"]);
  monsterKind.set(5, ["","미노타우르스", "아볼레스", "용", "종말의 용"]);

  const monsterHp = new Map();
  monsterHp.set(1, ["",3, 5, 9, 12]);
  monsterHp.set(2, ["",5, 10, 10, 18]);
  monsterHp.set(3, ["",7, 10, 15, 20]);
  monsterHp.set(4, ["",12, 12, 16, 18]);
  monsterHp.set(5, ["",13, 15, 16, 21]);

  const monsterAttack = new Map();
  monsterAttack.set(1, ["","D6", "D6", "D6 + 2", "D6 방어력무시"]);
  monsterAttack.set(2, ["","D6", "D6 + 3", "D6 + 4", "D6 + 2 방어력무시"]);
  monsterAttack.set(3, ["","D6", "D6", "D6 + 4 ", "D6 + 3"]);
  monsterAttack.set(4, ["","D6 * 2 중 낮은 수치", "D6 +1 방어력무시", "D6 + 3", "D6 * 2중 높은 수치 + 4 방어력무시"]);
  monsterAttack.set(5, ["","D6 + 1", "D6 + 3", "D6 * 2중 높은 수치 + 5", "D6 * 2중 높은 수치 + &"]);

  const monsterArmor = new Map();
  monsterArmor.set(1, ["",1, 2, 2, 2]);
  monsterArmor.set(2, ["",1, 1, 1, 1]);
  monsterArmor.set(3, ["",2, 1, 3, 1]);
  monsterArmor.set(4, ["",0, 3, 3, 4]);
  monsterArmor.set(5, ["",1, 0, 5, 5]);

  // 테스트 출력
  // console.log("선택한 지역:",monsterState.mapArea);
  // console.log("해당 지역에 등장한 몬스터 아이디",monsterState.monsterId);
  // console.log("해당 몬스터가 등장한 마릿수",monsterState.monsterNum);
  
  return (
    // html
    <div id="monster-stage-box">
      <div id="moster-stage-info-box">
        <h1>몬스터 정보</h1>
        <hr />
      </div>
      
      {
        monsterState.mapArea !== 0 ?
        <div id="monster-stage-inner-box">
          <div id="monster-stage-inner-info-box">
            <p style={{"color" : "white"}}>몬스터 이름 : {monsterKind.get(monsterState.mapArea)[monsterState.monsterId]}</p>
            <p style={{"color" : "white"}}>몬스터 숫자 : {monsterState.monsterNum}</p>
            <p style={{"color" : "white"}}>몬스터 HP : {monsterHp.get(monsterState.mapArea)[monsterState.monsterId]}</p>
            <p style={{"color" : "white"}}>몬스터 방어력 : {monsterArmor.get(monsterState.mapArea)[monsterState.monsterId]}</p>
            <p style={{"color" : "white"}}>몬스터 공격력 : {monsterAttack.get(monsterState.mapArea)[monsterState.monsterId]}</p>
          </div>
          <div id="monster-stage-pic-box">
            {monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="코볼트"? <img className='stage-pic' src={kobolt}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="도마뱀인간"? <img className='stage-pic' src={domabaemman}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="거대악어"? <img className='stage-pic' src={crocodile}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="코아틀"? <img className='stage-pic' src={koatle}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="코카트리스"? <img className='stage-pic' src={kokatris}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="그리폰"? <img className='stage-pic' src={griffin}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="오거"? <img className='stage-pic' src={ogre}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="혼돈의 즙"? <img className='stage-pic' src={chaos}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="드워프 전사"? <img className='stage-pic' src={dwarf}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="지하인"? <img className='stage-pic' src={jihain}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="거미왕"? <img className='stage-pic' src={spiderking}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="오튜그"? <img className='stage-pic' src={otuge}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="인면충"? <img className='stage-pic' id="human-face" src={bugman}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="사슬악마"? <img className='stage-pic' src={chaindevil}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="가시악마"? <img className='stage-pic' src={devil}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="천사"? <img className='stage-pic' src={angel}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="미노타우르스"? <img className='stage-pic' src={minotauros}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="아볼레스"? <img className='stage-pic' src={fish}></img>: monsterKind.get(monsterState.mapArea)[monsterState.monsterId] ==="용"? <img className='stage-pic' src={dragon}></img>: <img className='stage-pic' src={enddragon}></img>}
          </div>
          
        </div>
        :
        null
      }
    </div>
  )
}