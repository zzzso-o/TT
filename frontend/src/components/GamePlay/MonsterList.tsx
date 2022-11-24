import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { setMapState, setWindowSize } from "../../features/Game/GameSlice";
import { useEffect } from "react";
import './MonsterList.css'
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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


export default function MonsterList() {
  const mapStatus = useAppSelector((state:RootState) => state.game.mapStatus)
  
  const MonsterListOne = {
    name:["코볼트", "도마뱀인간", "거대악어", "코아틀"], 
    features:["두 발로 걷는 쥐처럼 생긴 몸집 작은 종족입니다.코볼트들은 용들의 노예 종족이며, 고대에는 용들 밑에서 학자로, 마법사 하인으로 일하기도 했습니다. 코볼트 혈족들은 각기 성심껏 주인으로 섬기는 용이 있습니다. 코볼트를 하나 보았다는 것은 주변에 다른 코볼트들이 있다는 뜻입니다. 그리고 주변에 다른 코볼트들이 더 있다면 멀지 않은 곳에 용도 하나 있을 것입니다.",
      "어느 여행하던 마법학자가 내게 이야기해 주길, 도마뱀인간은 우리보다 훨씬 오래 전에 문명을 세웠다는군. 엘프나 드워프나 인간이 나뭇가지를 엮어서 움집을 만들기도 전에, 도마뱀 왕들은 수정으로 된 궁전을 짓고 자기들의 신을 모셨다는 거야. 그게 사실일지도 모르고 아닐지도 모르지.",
      "아주 큰 악어입니다. 진짜 너무할 정도로 큽니다.",
      "세계의 부패와 오염을 비웃으며, 신은 지상에 코아틀을 내렸습니다. 마치 이 끔찍한 곳에도 아름다움이 존재한다는 것을 말하려는 듯이 . . . 코아틀은 보석 박힌 날개로 비행하는 뱀입니다. 이 어두운 세상을 정화하고 빛을 가져 오는 것을 사명으로 삼습니다. 코아틀의 부탁을 들어주면 그 방대한 지식을 나누어 받을 수 있을지도 모릅니다.",
    ], 
    attack:["창(D6 피해)","창(D6 피해)","깨물기(D6 + 2 피해)","정화의 광선(D6 피해, 방어력 무시"], 
    hp:[3, 5, 9, 12], 
    defense:[1, 2, 2, 2], 
    instinct:["용을 섬긴다","문명을 파괴한다","먹는다","정화한다"], 
    tag: ["대집단, 작음, 은밀, 지능적, 조직적","소집단, 은밀, 지능적, 조직적","소집단, 큼","외톨이, 지능적"]}
  
  const MonsterListTwo = {
    name:["코카트리스", "그리폰", "오거", "혼돈의 즙"], 
    features:["평생 그런 건 본 적이 없습니다, 나으리. 로드릭은 닭인 줄 알았고 . . . 아, 불쌍한 로드릭! 저는 무슨 도마뱀인 줄 알았지요. 그런데 로드릭이 옳았습니다. 부리가 있었고 회색 깃털도 있었습죠. 저는 낌새가 이상해서 로드릭을 잡아 끌었는데, 움직임이 갈수록 느려지더니 . . . 예, 보시는 대로 이렇습니다. 꼭 얼어 죽은 개처럼 굳었지요. 불쌍한 로드릭 . . . ",
      "첫 눈에 보면 그리폰이 만티코어나 키마이라 같은 마법의 괴수라고 생각될지도 모릅니다.그리폰의 정신은 그런 합성수들처럼 어지럽지 않고, 품성은 도도하면서도 충성스럽습니다. 그리폰과 친해진다는 것은 평생 동안 변치 않는 친구를 얻게 된다는 뜻입니다. 그리폰을 만날 일이 있다면 존중을 보이고 예의를 갖추는 것이 중요합니다. 비록 짐승의 모습을 하고 있으나, 그리폰들은 아주 사소한 모욕도 알아채고 커다란 부리와 날카로운 발톱으로 보복하기 때문입니다.",
      "한 무리는 더 깊은 숲 속으로 들어가 더 야만스러운 삶을 살았다. 이 야만의 인류는 밖으로 나간 동포들을 혐오하며 숲 속에서 점점 강해져 갔다. 그러면서 깊은 숲과 언덕 밑에서 자기들 나름대로 신들, 우리가 보면 마왕이나 암흑신이라 할 만한 존재들을 발견하여 섬기게 되었다.숲 속의 야만인은 스스로를 오거라 부르고, 강건한 육체, 그리고 증오로 가득 찬 마음을 갖게 되었다.",
      "문명 종족이 잘 가지 않는 곳에서는 때때로 이계가 이리로 샙니다. 마법사들은 이를 마법 의식에 사용하곤 합니다. 유용한 자원이라면 유용한 자원이지만, 때로는 저 혼자 꿈틀거리며 움직이기도 합니다. 그리고 여기에 닿은 것들은 뭔가 기이한 모습으로 변하는 것입니다. 혼돈은 혼돈을 낳으며 자라납니다.",
    ], 
    attack:["부리 (D6 피해)","발톱(D6 + 3 피해)","몽둥이 (D6 + 4 피해)","뒤틀기 (D6 + 2 피해, 방어력 무시"], 
    hp:[5, 10, 10, 18], 
    defense:[1, 1, 1, 1], 
    instinct:["둥지를 지킨다","우리편을 돕는다","세계를 어두웠던 과거로 회귀시킨다.","변화시킨다"], 
    tag: ["소집단, 작음, 보물지기","소집단, 큼, 조직적","소집단, 큼, 지능적","외톨이, 이계, 끔찍함, 부정형"]}
  
  
    const MonsterListThree = {
      name:["드워프 전사", "지하인", "거미왕", "오튜그"], 
      features:["인류는 드워프들이 모두 남자이고 모두 무서운 전사라고 믿어 왔습니다. 인간들이 굴을 파고 광산이라도 짓는다 싶으면 도끼를 들고 판금을 두른 수염투성이 드워프들이 땅속에서 소리를 지르며 쏟아져 나와 인간들을 몰아내고는 했습니다. 드워프 전사의 신뢰를 얻으면 평생 등 뒤를 걱정하지 않아도 됩니다. 그러나 그 분노를 산다면, 후회를 할 만큼 오래 살지 못할 가능성이 높습니다.",
        "인류의 옛 조상은 후예들의 도시와 마을, 쇠붙이와 불에 밀려나 이제 땅 밑에서 살아갑니다. 이은 마치 인간과 유인원의 중간처럼 생겼습니다.축, 문명의 이기, 그리고 사람들을 끌고 언덕 밑으로 돌아갑니다. 지하인들은 흉포하고 악취가 심합니다. 자취를 감추어가는 오래된 종족이지만, 인간들은 지하인들이 하루라도 빨리 없어지기를 바랍니다.",
        "거미들도 신을 섬겨서 그 작은 발로 거미줄을 퉁겨 기도를 한다면, 이를 듣는 것은 아마도 이 괴물일 터입니다.",
        "하수도 깊은 곳에서, 죽어가는 코끼리의 비명과 썩은 고기를 본 독수리의 울음을 섞은 듯한 소리가 들려 오면 그것은 오튜그가 짝을 부르고 있는 것입니다. 오튜그는 오수 속에서 시간을 보내며, 다른 무엇보다도 쓰레기를 잘 먹습니다.던전의 오튜그들은 오크나 고블린들을 비롯한 지하 종족들의 시체를 먹고 날이 갈수록 커지고 강해집니다.혹 살아남더라도 꼭 의사에게 가 보십시오. 안 그러면 상처가 썩어 들어가고 열이 올라, 애써 빠져나온 보람도 없이 죽을 것입니다.",
      ], 
      attack:["도끼 (D6 피해)","몽둥이 (D6 피해)","집게턱 (D6 + 4 피해)","촉수 (D6 + 3 피해)"], 
      hp:[7, 10, 15, 20], 
      defense:[2, 1, 3, 1], 
      instinct:["지킨다","문명을 공격한다","거미줄을 잣고 흉계를 꾸민다","더럽힌다"], 
      tag: ["대집단, 조직적","소집단, 조직적","외톨이, 큼, 음흉적, 지능적","외톨이, 큼"]}


  const MonsterListFour = {
    name:["인면충", "사슬악마", "가시악마", "천사"], 
    features:["지옥을 보고도 할 말을 잃지 않은 사람들은 때때로 그 안에 사람 얼굴을 한 구더기들이 있다고 말합니다. 불구덩이 속에서 영원한 고통에 시달리며, 애타는 목소리로 구해 달라 한다고 합니다. 이들은 가끔 이계와 물질계를 나누는 장벽의 틈새로 나오기도 합니다. 얼마 되지 않아 점액을 흘리며 죽지만, 그 짧은 시간 동안 이 세계에 질병과 불화를 퍼뜨립니다.",
      "사슬 악마는 지상에 나타날 때마다 모습이 다르지만, 그 목적은 하나, 쇠사슬로 사람을 묶어서 지옥에 끌어가는 것입니다. 사슬 악마는 녹슨 쇠고랑과 쇠갈퀴와 쇠사슬이 사람 형체를 갖춘 듯한 모양을 하고 있을 때도 있고, 얽힌 밧줄 무더기, 해초, 피 묻은 침대보의 모습을 하고 있을 때도 있습니다. 결과는 항상 같습니다.",
      "악마에는 천 가지 종류가 있습니다. 이단심문관들은 새로 악마를 발견할 때마다 악마대전에 이를 기록하며, 그 내용은 새 악마가 지상을 어지럽히는 일을 방지하고자 온 세상의 수도원에 전파됩니다. 가시 악마는 이단심문회에 오랫동안 알려져 있었습니다. 가시 악마는 이름 그대로 온몸이 긴 가시에 덮여 있고, 피를 흐르게 하는 것을 매우 좋아합니다. 특히 가시로 사람을 조금씩, 또는 한꺼번에 꿰어서 죽이는 것을 즐깁니다. 잔인한 악마이지만 사람을 죽이는 것 말고는 재주가 없습니다.",
      "경전은 이렇게 말한다. 하늘이 아브라할의 머리 위에 열리고, 구름 속에서 천사가 내려왔다. 천사의 모습은 아브라할의 첫딸과 같아서 아름답고 검은 피부에 금빛 눈을 하고 있었고, 아브라할은 이를 보고 눈물을 흘렸다. ‘두려워하지 말라.’ 천사가 아브라할에게 명했다. ‘마을에 가서 내가 네 꿈에 보여준 것을 보여주고, 내가 네 영혼에 새긴 말씀을 보여 주어라.’ 아브라할은 눈물을 흘리고 흘리며 그러겠노라 하였다. 아브라할은 왼손에 검을, 오른손에 책을 들고 마을로 향했다. 아브라할은 피에 목이 말라 있었다. 천사가 그 영혼에 새긴 말씀은 ‘죽이라’였기 때문이다.",
    ], 
    attack:["점액 (저[2D6] 피해)","죄기 (D6 + 1 피해, 방어력 무시)","가시 (D6 + 3 피해)","불타는 검 (고[2D6] + 4 피해, 방어력 무시)"], 
    hp:[12, 12, 16, 18], 
    defense:[0, 3, 3, 4], 
    instinct:["괴로워한다.","포획한다.","살을 찢고 피를 흐르게 한다.","신의 의지를 실현한다."], 
    tag: ["대집단, 음흉, 이계, 지능적","외톨이, 이계","외톨이, 큼, 이계, 끔찍함","외톨이, 끔찍함, 신성, 지능적, 조직적"]}


  const MonsterListFive = {
    name:["미노타우르스", "아볼레스", "용", "종말의 용"], 
    features:["사람 머리에 황소 몸을 한 괴물? 그 반대? 황소의 머리와 사람의 몸이란 얘긴가? 발굽이 달린 것도 있다고? 그런가? 그 늙은 왕이 미로가 어쩌구 하는 얘기도 한 것 같은데.",
      "아볼레스는 고래만한 물고기입니다. 지하 깊은 곳에 펼쳐진 바다처럼 넓은 호수에 살고, 우무 같은 촉수를 뻗어 빛 없는 호숫가를 더듬습니다. 아볼레스들은 여러 종족 출신의 노예들을 거느리는데, 이들은 하나같이 앞을 못 보고 피부에 색이 없습니다. 아볼레스들은 노예들을 통해 서로 경쟁하며, 노예들을 시켜 지상을 향해 탑을 쌓고 굴을 팝니다. 언젠가 밖으로 나갈 날을 위한 것입니다.",
      "이 세계에서 가장 장대하고 무서운 존재가 무엇이냐고 물으면 열에 아홉은 용을 꼽습니다.",
      "결국에는 나무도 흙도 공기도 모두 불탈 것입니다. 그리고 종말은 다른 그 어느 곳도 아니라 세계의 심장에서 찾아올 것입니다. 대지의 깊숙한 곳을 자궁으로 삼아 태어난 종말의 용이 바로 이 세상의 끝을 가져오게 될 것입니다. 종말의 용을 섬기는 것은 광기를 초래하는 일이라고 합니다.종말의 용을 사랑하는 것은 허무를 이해하는 것이라고 합니다. 와야만 할 날은 머지않아 올 것입니다."], 
    attack:["도끼 (D6 + 1 피해)","촉수 (D6 + 3 피해)","깨물기 (고[2D6] + 5 피해)","깨물기 (고[2D6] + 7 피해)"], 
    hp:[13, 15, 16, 21], 
    defense:[1, 0, 5, 5], 
    instinct:["가둔다.","명령한다.","지배한다.","세계를 끝낸다."], 
    tag: ["외톨이, 큼","소집단, 거대, 지능적","외톨이, 거대, 끔찍함, 조심스러운, 보물지기","몇걸음, 괴력, 파괴적"]}
    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // dotsClass: "custom-dots",
    }

    
    return (
        <div id="monster">
          <h1>MonsterList</h1>
          <Slider className="monster-carousel" {...settings}>
              <div className="monster1">
                {mapStatus === 1 ? <img className="monster-img" src={kobolt} alt="코볼트" /> : mapStatus === 2 ? <img className="monster-img" src={kokatris} alt="코카트리스"/> : mapStatus === 3 ? <img className="monster-img" src={dwarf} alt="드워프전사" /> : mapStatus === 4 ? <img className="monster-img" src={bugman} alt="인면충" /> : <img className="monster-img" src={minotauros} alt="미노타우르스" /> }
                <div className="monster-name">{mapStatus === 1 ? MonsterListOne.name[0] : mapStatus === 2 ? MonsterListTwo.name[0] : mapStatus === 3 ? MonsterListThree.name[0] : mapStatus === 4 ? MonsterListFour.name[0] : MonsterListFive.name[0] }</div>
                <div className="monster-features">{mapStatus === 1 ? MonsterListOne.features[0] : mapStatus === 2 ? MonsterListTwo.features[0] : mapStatus === 3 ? MonsterListThree.features[0] : mapStatus === 4 ? MonsterListFour.features[0] : MonsterListFive.features[0] }</div>
                <div className="monster-attack">공격력: {mapStatus === 1 ? MonsterListOne.attack[0] : mapStatus === 2 ? MonsterListTwo.attack[0] : mapStatus === 3 ? MonsterListThree.attack[0] : mapStatus === 4 ? MonsterListFour.attack[0] : MonsterListFive.attack[0] }</div>
                <div className="monster-hp">체력: {mapStatus === 1 ? MonsterListOne.hp[0] : mapStatus === 2 ? MonsterListTwo.hp[0] : mapStatus === 3 ? MonsterListThree.hp[0] : mapStatus === 4 ? MonsterListFour.hp[0] : MonsterListFive.hp[0] }</div>
                <div className="monster-defense">방어력: {mapStatus === 1 ? MonsterListOne.defense[0] : mapStatus === 2 ? MonsterListTwo.defense[0] : mapStatus === 3 ? MonsterListThree.defense[0] : mapStatus === 4 ? MonsterListFour.defense[0] : MonsterListFive.defense[0] }</div>            
                <div className="monster-instinct">충동: {mapStatus === 1 ? MonsterListOne.instinct[0] : mapStatus === 2 ? MonsterListTwo.instinct[0] : mapStatus === 3 ? MonsterListThree.instinct[0] : mapStatus === 4 ? MonsterListFour.instinct[0] : MonsterListFive.instinct[0] }</div>            
                <div className="monster-tag">태그: {mapStatus === 1 ? MonsterListOne.tag[0] : mapStatus === 2 ? MonsterListTwo.tag[0] : mapStatus === 3 ? MonsterListThree.tag[0] : mapStatus === 4 ? MonsterListFour.tag[0] : MonsterListFive.tag[0] }</div>            
              </div>
              <div className="monster2">
                {mapStatus === 1 ? <img className="monster-img" src={domabaemman} alt="도마뱀인간" /> : mapStatus === 2 ? <img className="monster-img" src={griffin} alt="그리폰"/> : mapStatus === 3 ? <img className="monster-img" src={jihain} alt="지하인" /> : mapStatus === 4 ? <img className="monster-img" src={chaindevil} alt="사슬악마" /> : <img className="monster-img" src={fish} alt="아볼레스" /> }
                <div className="monster-name">{mapStatus === 1 ? MonsterListOne.name[1] : mapStatus === 2 ? MonsterListTwo.name[1] : mapStatus === 3 ? MonsterListThree.name[1] : mapStatus === 4 ? MonsterListFour.name[1] : MonsterListFive.name[1] }</div>
                <div className="monster-features">{mapStatus === 1 ? MonsterListOne.features[1] : mapStatus === 2 ? MonsterListTwo.features[1] : mapStatus === 3 ? MonsterListThree.features[1] : mapStatus === 4 ? MonsterListFour.features[1] : MonsterListFive.features[1] }</div>
                <div className="monster-attack">공격력: {mapStatus === 1 ? MonsterListOne.attack[1] : mapStatus === 2 ? MonsterListTwo.attack[1] : mapStatus === 3 ? MonsterListThree.attack[1] : mapStatus === 4 ? MonsterListFour.attack[1] : MonsterListFive.attack[1] }</div>
                <div className="monster-hp">체력: {mapStatus === 1 ? MonsterListOne.hp[1] : mapStatus === 2 ? MonsterListTwo.hp[1] : mapStatus === 3 ? MonsterListThree.hp[1] : mapStatus === 4 ? MonsterListFour.hp[1] : MonsterListFive.hp[1] }</div>
                <div className="monster-defense">방어력: {mapStatus === 1 ? MonsterListOne.defense[1] : mapStatus === 2 ? MonsterListTwo.defense[1] : mapStatus === 3 ? MonsterListThree.defense[1] : mapStatus === 4 ? MonsterListFour.defense[1] : MonsterListFive.defense[1] }</div>            
                <div className="monster-instinct">충동: {mapStatus === 1 ? MonsterListOne.instinct[1] : mapStatus === 2 ? MonsterListTwo.instinct[1] : mapStatus === 3 ? MonsterListThree.instinct[1] : mapStatus === 4 ? MonsterListFour.instinct[1] : MonsterListFive.instinct[1] }</div>            
                <div className="monster-tag">태그: {mapStatus === 1 ? MonsterListOne.tag[1] : mapStatus === 2 ? MonsterListTwo.tag[1] : mapStatus === 3 ? MonsterListThree.tag[1] : mapStatus === 4 ? MonsterListFour.tag[1] : MonsterListFive.tag[1] }</div>            
              </div>
              <div className="monster3">
                {mapStatus === 1 ? <img className="monster-img" src={crocodile} alt="거대악어" /> : mapStatus === 2 ? <img className="monster-img" src={ogre} alt="오거"/> : mapStatus === 3 ? <img className="monster-img" src={spiderking} alt="거미왕" /> : mapStatus === 4 ? <img className="monster-img" src={devil} alt="가시악마" /> : <img className="monster-img" src={dragon} alt="용" /> }
                <div className="monster-name">{mapStatus === 1 ? MonsterListOne.name[2] : mapStatus === 2 ? MonsterListTwo.name[2] : mapStatus === 3 ? MonsterListThree.name[2] : mapStatus === 4 ? MonsterListFour.name[2] : MonsterListFive.name[2] }</div>
                <div className="monster-features">{mapStatus === 1 ? MonsterListOne.features[2] : mapStatus === 2 ? MonsterListTwo.features[2] : mapStatus === 3 ? MonsterListThree.features[2] : mapStatus === 4 ? MonsterListFour.features[2] : MonsterListFive.features[2] }</div>
                <div className="monster-attack">공격력: {mapStatus === 1 ? MonsterListOne.attack[2] : mapStatus === 2 ? MonsterListTwo.attack[2] : mapStatus === 3 ? MonsterListThree.attack[2] : mapStatus === 4 ? MonsterListFour.attack[2] : MonsterListFive.attack[2] }</div>
                <div className="monster-hp">체력: {mapStatus === 1 ? MonsterListOne.hp[2] : mapStatus === 2 ? MonsterListTwo.hp[2] : mapStatus === 3 ? MonsterListThree.hp[2] : mapStatus === 4 ? MonsterListFour.hp[2] : MonsterListFive.hp[2] }</div>
                <div className="monster-defense">방어력: {mapStatus === 1 ? MonsterListOne.defense[2] : mapStatus === 2 ? MonsterListTwo.defense[2] : mapStatus === 3 ? MonsterListThree.defense[2] : mapStatus === 4 ? MonsterListFour.defense[2] : MonsterListFive.defense[2] }</div>            
                <div className="monster-instinct">충동: {mapStatus === 1 ? MonsterListOne.instinct[2] : mapStatus === 2 ? MonsterListTwo.instinct[2] : mapStatus === 3 ? MonsterListThree.instinct[2] : mapStatus === 4 ? MonsterListFour.instinct[2] : MonsterListFive.instinct[2] }</div>            
                <div className="monster-tag">태그: {mapStatus === 1 ? MonsterListOne.tag[2] : mapStatus === 2 ? MonsterListTwo.tag[2] : mapStatus === 3 ? MonsterListThree.tag[2] : mapStatus === 4 ? MonsterListFour.tag[2] : MonsterListFive.tag[2] }</div>            
              </div>
              <div className="monster4">
                {mapStatus === 1 ? <img className="monster-img" src={koatle} alt="코아틀" /> : mapStatus === 2 ? <img className="monster-img" src={chaos} alt="혼돈의즙"/> : mapStatus === 3 ? <img className="monster-img" src={otuge} alt="오튜그" /> : mapStatus === 4 ? <img className="monster-img" src={angel} alt="천사" /> : <img className="monster-img" src={enddragon} alt="종말의용" /> }
                <div className="monster-name">{mapStatus === 1 ? MonsterListOne.name[3] : mapStatus === 2 ? MonsterListTwo.name[3] : mapStatus === 3 ? MonsterListThree.name[3] : mapStatus === 4 ? MonsterListFour.name[3] : MonsterListFive.name[3] }</div>
                <div className="monster-features">{mapStatus === 1 ? MonsterListOne.features[3] : mapStatus === 2 ? MonsterListTwo.features[3] : mapStatus === 3 ? MonsterListThree.features[3] : mapStatus === 4 ? MonsterListFour.features[3] : MonsterListFive.features[3] }</div>
                <div className="monster-attack">공격력: {mapStatus === 1 ? MonsterListOne.attack[3] : mapStatus === 2 ? MonsterListTwo.attack[3] : mapStatus === 3 ? MonsterListThree.attack[3] : mapStatus === 4 ? MonsterListFour.attack[3] : MonsterListFive.attack[3] }</div>
                <div className="monster-hp">체력: {mapStatus === 1 ? MonsterListOne.hp[3] : mapStatus === 2 ? MonsterListTwo.hp[3] : mapStatus === 3 ? MonsterListThree.hp[3] : mapStatus === 4 ? MonsterListFour.hp[3] : MonsterListFive.hp[3] }</div>
                <div className="monster-defense">방어력: {mapStatus === 1 ? MonsterListOne.defense[3] : mapStatus === 2 ? MonsterListTwo.defense[3] : mapStatus === 3 ? MonsterListThree.defense[3] : mapStatus === 4 ? MonsterListFour.defense[3] : MonsterListFive.defense[3] }</div>            
                <div className="monster-instinct">충동: {mapStatus === 1 ? MonsterListOne.instinct[3] : mapStatus === 2 ? MonsterListTwo.instinct[3] : mapStatus === 3 ? MonsterListThree.instinct[3] : mapStatus === 4 ? MonsterListFour.instinct[3] : MonsterListFive.instinct[3] }</div>            
                <div className="monster-tag">태그: {mapStatus === 1 ? MonsterListOne.tag[3] : mapStatus === 2 ? MonsterListTwo.tag[3] : mapStatus === 3 ? MonsterListThree.tag[3] : mapStatus === 4 ? MonsterListFour.tag[3] : MonsterListFive.tag[3] }</div>            
              </div>          
          </Slider>
        </div>
        
    )
}