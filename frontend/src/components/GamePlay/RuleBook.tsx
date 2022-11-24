import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RuleBook.css'


export default function RuleBook() {

  //action
  const jkj = {name: "접근전", explain:"근거리 전투에서 적을 공격하면 +근 판정을 합니다.", choice:["적에게 피해를 주고 자기는 공격을 피합니다.", "적에게 피해를 주고, 자신도 상대의 공격을 받습니다."]}
  const sk = {name:"사격", explain:"멀리서 적을 겨누고 쏘면 +민 판정을 합니다.", choice:["깔끔하게 명중하여 피해를 줍니다.", "* 쏘려고 자세를 바꾸거나 자리를 옮기는 바람에 곤경에 처합니다.\n(세부사항은 마스터가 정합니다.)\n* 악조건에서 쏘아 위력이 약하거나 효과가 떨어집니다.\n(-1D6 피해)\n중 하나를 선택합니다.(어느 것을 골라도 피해는 줍니다.)"]}
  const dd = {name:"위험 돌파", explain:"즉각적인 위험을 감수하고 행동하는 경우, 또는 재난이 닥친 경우,\n여기에 어떻게 대처할지 설명하고 판정하십시오. 어떻게 하느냐에 따라 판정 방법이 달라집니다.\n* 힘으로 밀어 붙이려면 +근 판정\n* 비키거나 피하는 등, 날래게 움직이려면 +민 판정\n* 몸으로 버티려면 +체 판정\n* 재치로 이겨내려면 +지 판정\n* 의지력으로 견디려면 +혜 판정\n* 매력과 사교술로 극복하려면 +매 판정", choice:["위험을 모면하고 원하는 것을 해 냅니다.", "휘청대거나, 주저하거나, 움츠리는 것으로, 마스터는 덜 좋은 결과, 어려운 선택, 또는 불리한 거래를 제시할 것입니다."]}
  const jd = {name: "지식 더듬기", explain:"무언가에 대해 그간 쌓은 지식을 참고하는 경우 +지 판정을 합니다.", choice:["마스터는 그 대상에 관하여 현재 상황에서 의미가 있는 흥미롭고도 유용한 사실을 밝힐 것입니다.", "마스터는 그냥 흥미롭기만 한 사실을 밝히고, 이것을 유용하게 쓰는 것은 캐릭터의 재주에 달려 있습니다."]}
  const sp = {name: "상황 파악", explain:"상황이나 사람을 세심히 살펴 보면 +혜 판정을 합니다\n* 여기서 최근에 무슨 일이 일어 났는가?\n* 무슨 일이 일어나려고 하고 있는가?\n * 어떤 것에 주의를 기울여야 하는거?\n* 여기서 나에게 유용하거나 값진 것은 무엇인가?\n* 이 상황은 누가 장악하고 있는가?\n* 여기서 겉보기와 다른 것은 무엇인가?", choice:["다음 목록에서 셋을 골라 마스터에게 질문하십시오", "하나만 골라서 묻습니다."]}
  const hs = {name: "협상", explain:"상대 NPC가 관심을 갖는 조건을 자신이 갖고 있고 그것을 대가로 그  NPC에게 무언가를 시키려 하면 +매 판정합니다", choice:["상대는 이쪽의 약속을 받고서 시키는 것을 합니다.", "상대는 이쪽의 약속을 보장할 무언가를 요구합니다."]}
  const basic = {explain: "판정의 기본적인 결과", choice: ["거의 문제 없이 해 냅니다","하기는 하지만, 일이 꼬이거나 문제가 생깁니다","어떻게 되는지 마스터가 정하고, 캐릭터는 경험치를 얻습니다."]}  
  
  //character
  const character = {
    one:["직업을 고른다", "플레이어들이 던전월드의 모험가가 가질 수 있는 직업들 중 각자 하나씩을 선택하도록 가이드를 해야 한다. 모두 서로 다른 직업을 골라야 합니다."],
    two: ["능력치를 설정한다.", "추가로 능력 수정치를 플레이어들에게 설명한다.\n 육면체 주사위를 3번 굴려서 나온 결과의 합을 능력치로 설정한다.\n 계산된 결과를 기반으로 각 능력치에 아래의 표에 있는 수정치를 부여한다.\n 각 캐릭터의 스탯은 18을 넘길 수 없다."],
    twoTable: {
      능력치:["1~3", "4~5", "6~8", "9~12", "13~15", "16~17", "18"],
      수정치:[-3, -2, -1, 0, 1, 2, 3]
    },
    three: ["HP가 계산되거나, 직접 작성하거나", "각 플레이어들이 나온 체력 능력치에 각 직업의 고유 HP를 더하여 해당 플레이어의 최대 HP를 알려준다."],
    four: ["종족을 고른다", "테마의 배경과 직업에 맞는 종족을 고르도록 유도한다."],
    five: ["이름을 고른다", "테마의 배경과 직업에 맞는 이름을 고르도록 유도한다."],
    six: ["외모를 고른다", "테마의 배경과 직업에 맞는 외모를 고르도록 유도한다."],
    seven:["가치관을 선택한다","직업 설정집에 있는 각 직업의 고유한 가치관에서 하나를 선택하도록 알려준다.\n 선택한 가치관은 TRPG를 플레이하면서 지켜야할 컨셉임을 플레이어들에게 인지시킨다. "],
    eight:["캐릭터 자기소개", "모든 플레이어가 프로필 작성을 완료하면 각 플레이어들이 설정한 캐릭터를 소개하도록 알려준다."]
  }
 
  
  //GM guide
  const gmGuide = {
    rule: ["플레이어가 아니라 캐릭터와 대화한다.", "환상적인 것들을 받아들인다.", "앞에서부터 이어지는 액션을 한다.", "액션의 이름을 밝히지 않는다.", "모든 괴물에게 생동감을 준다.", "모든 사람에게 이름을 준다.", "질문을 하고 답변을 활용한다.", "주인공들의 팬이 된다.", "주저 없이 파괴한다.", "이야기로 시작해서 이야기로 끝낸다.", "때때로 화면 밖의 일도 생각한다."],
    action: ["괴물, 장소, 위험요소의 액션을 사용한다.", "반갑지 않은 사실을 드러낸다.", "다가오는 위험의 징조를 보인다.", "피해를 준다.", "자원을 소비시킨다.", "PC들의 액션을 역이용한다.", "PC들을 서로 떨어뜨린다.", "특정 직업에 어울리는 기회를 제공한다.", "특정 직업, 종족, 장비의 약점을 부각시킨다", "대가를 요구하는, 또는 대가 없는 기회를 제공한다.", "조건이나 결과를 내걸고 의향을 묻는다."],
    dungeonaction: ["풍경을 바꾼다", "새로운 파벌이나 새로운 종류의 괴물을 등장시킨다", "기존의 파벌이나 이미 나온 종류의 괴물을 활용한다,", "완던 길을 돌아가게 한다.", "대가를 치르면 얻을 수 있는 보물을 보여 준다.", "캐릭터 중 한 명이 넘을 난관을 제시한다."],
    describtion: ["괴물이 무엇을 하고 어떤 문제를 일으키는지,", " 또는 크기와 공격 방식에 대한 묘사가 필요하다."]
  }
  

  // job setting
  const jobSetting = {
    thief: ["모닥불 주변에서 친구들이 떠드는 그 사이에 당신은 돈을 세면서 씨익 웃습니다. 이 세상에서 진짜 중요한 것이 다름 아닌 돈임을 당신은 잘 알고 있습니다.\n 당신이 혼자 슬쩍 빠져나갈 때마다 동료들은 의심하며 타박하지만, 당신이 없었으면 모두 벽에서 발사된 칼날에 해부가 되었거나 고대인들의 독침 덫에 걸려 길고 괴로운 죽음을 맞았을 것입니다.\n 그러니 마음껏 불평불만을 하라고 내버려 두십시오. 모험질이 끝나면 영웅님들의 무덤에 건배를 올리는 것은 당신이 될 테니까요.", 
    "아무 계획 없이위험한 상황에 뛰어든다", "계획적으로 움직인다.", "자기가 처한 위험이나 자기의 잘못을 남에게 전가합니다."],
    wizard: ["이 세계는 법칙으로 움직입니다. 그 법칙은 사람의 법률도 아니고, 어느 좀스러운 폭군의 변덕도 아닙니다. 그보다 더 크고, 더 좋은 법칙입니다.\n당신은 고서에 얼굴을 파묻고 오랜 시간을 보냈습니다. 실험 때문에 미칠 뻔한 적도 많고, 소환 의식이 잘못되어 영혼이 날아갈 뻔 한 적도 있습니다.\n그 모든 것은 무엇을 위해서 한 것입니까? 당연히 힘을 위해 한 것입니다. 달리 추구할 것이 세상에 어디 있단 말입니까?\n남들은 당신을 백안시합니다. 등 뒤에서 “흑마술사”니 “악마소환사”니 수군대며 손가락질을 합니다. 물론 그것은 우주의 비밀을 알지 못하는 자들의 질투일 뿐입니다.", "다른 사람을 직접적으로 도움", "수수께끼에 관한 사실을 밝힘", "마법을 이용해서 공포를 일으킴"],
    priest: ["모험가들이 가는 곳은 살벌하기가 짝이 없어 마치 신의 버림을 받은 듯합니다. 시체가 돌아다니지를 않나, 식인 짐승이 들끓지를 않나. 그래서 당신이 이곳에 필요한 것입니다.\n당신에게 있어서 이교도들에게 신의 영광을 보이는 것은 그냥 직무가 아니라 천부의 임무입니다. 검과 철퇴와 주문으로 말씀을 전파하고 무지한 야만의 땅에 깊은 칼자국을 내고 참된 믿음의 씨앗을 심는 것이야말로 곧 당신 삶의 보람입니다.\n온 세상에 가르쳐 주십시오, 누가 우주의 진정한 주인이신지.", "남을 치유하기 위해 스스로 위험에 빠트림", "교회의 교리나 신의 가르침을 따르기 위해서 스스로를\n위험에 빠트립니다.", "남을 해침으로 자기의 교회나 신의 우월함을 증명합니다."],
    warrior: ["매일 같이 갑옷과 칼솜씨만을 의지하며 뒤도 돌아보지 않고 위험 속에 뛰어들지만, 남들은 고마운 줄을 모릅니다. 그런 것은 전혀 아쉽지 않습니다.\n당신이 이 일을 하는 건 뛰는 가슴과 싸움의 함성, 그리고 뜨겁고 뜨거운 피 때문입니다. 친구들은 강철로 만든 검을 가지고 다니지만, 전사여, 당신은 강철 그 자체입니다.\n무엇이 되었건 부딪쳐 보라고 하십시오. 먼지가 걷히고 나면 서 있는 것은 당신뿐일 테니까요.","약한 자를 보호","강한 상대를 쓰러트림","항복했거나 저항하지 못하는 적을 죽임"],
    hunter: ["누구는 당신을 길잡이라고 합니다. 누구는 숲사람이라고, 누구는 야인이라고 합니다. 그러나 그런 말들은 야생의 몸과 마음을 담아낼 수 없습니다.\n당신은 지금까지 혼자 야외에서 살아 왔지만, 위대한 무언가가, 어쩌면 운명이, 당신을 불러 이 도시 사람들과 함께 두었습니다. 이 사람들이 모르는 땅의 비밀을 당신은 알고 있습니다.\n당신이 없으면 모두가 길을 잃습니다. 사냥꾼이여, 피와 어둠을 뚫고 길을 밝히십시오.","누군가를 물리적, 정신적, 사회적 속박으로부터 풀어준다","자연의 섭리에 어긋나는 위험한 것과 싸우기 위해 스스로 위험에 빠트립니다.","야생의 신령 또는 동물을 도와줍니다."]
  }



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: "custom-dots",
  }
  
  return (
        <div id='rulebook'>
          <h1>RuleBook</h1>
          <Slider className="rulebook-carousel" {...settings}>
            <div className="rule-action">
              <p className="rule-subtitle">액션 가이드</p>
              <div className="action-group">
                <div className="action-basic">{basic.explain}</div>
                <div><span className="dice-number">10+: </span>{basic.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{basic.choice[1]}</div>
                <div><span className="dice-number">6-: </span>{basic.choice[2]}</div>
              </div>
              <br />
              <div className="action-group">
                <div className="action-name">{jkj.name}</div>
                <div className="action-explain">{jkj.explain}</div>
                <div><span className="dice-number">10+: </span>{jkj.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{jkj.choice[1]}</div>
              </div>
              <br />
              <div className="action-group">
                <div className="action-name">{sk.name}</div>
                <div className="action-explain">{sk.explain}</div>
                <div><span className="dice-number">10+: </span>{sk.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{sk.choice[1]}</div>
              </div>
            </div>
            <div className="rule-action">
            <p className="rule-subtitle">액션 가이드</p>
              <div className="action-group">
                <div className="action-name">{dd.name}</div>
                <div className="action-explain">{dd.explain}</div>
                <div><span className="dice-number">10+: </span>{dd.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{dd.choice[1]}</div>
              </div>
              <br />
              <div className="action-group">
                <div className="action-name">{jd.name}</div>
                <div className="action-explain">{jd.explain}</div>
                <div><span className="dice-number">10+: </span>{jd.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{jd.choice[1]}</div>
              </div>
            </div>
            <div className="rule-action">
            <p className="rule-subtitle">액션 가이드</p>
              <div className="action-group">
                <div className="action-name">{sp.name}</div>
                <div className="action-explain">{sp.explain}</div>
                <div><span className="dice-number">10+: </span>{sp.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{sp.choice[1]}</div>
              </div>
              <br />
              <div className="action-group">
                <div className="action-name">{hs.name}</div>
                <div className="action-explain">{hs.explain}</div>
                <div><span className="dice-number">10+: </span>{hs.choice[0]}</div>
                <div><span className="dice-number">7~9: </span>{hs.choice[1]}</div>
              </div>
            </div>
            <div className="rule-character">
              <p className="rule-subtitle">캐릭터 만들기</p>
              <div>
                <div className="action-name">1. {character.one[0]}</div>
                <div>{character.one[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">2. {character.two[0]}</div>
                <div>{character.two[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">3. {character.three[0]}</div>
                <div>{character.three[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">4. {character.four[0]}</div>
                <div>{character.four[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">5. {character.five[0]}</div>
                <div>{character.five[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">6. {character.six[0]}</div>
                <div>{character.six[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">7. {character.seven[0]}</div>
                <div>{character.seven[1]}</div>
              </div>
              <br />
              <div>
                <div className="action-name">8. {character.eight[0]}</div>
                <div>{character.eight[1]}</div>
              </div>              
            </div>
            <div className="action-group">
            <p className="rule-subtitle">GM 가이드</p>
              <p className="action-name">원칙</p>
              {gmGuide.rule.map(function (a:string) {
                return (
                  <div key={a}>{a}</div>
                )
              })}
            <div className="action-group">
              <p className="action-name">액션</p>
              {gmGuide.action.map(function (a:string) {
                return (
                  <div key={a}>{a}</div>
                )
              })}
            </div>
            </div>
            <div className="action-group">
              <p className="rule-subtitle">GM 가이드</p>
                <p className="action-name">던전 액션</p>
                {gmGuide.dungeonaction.map(function (a:string) {
                  return (
                    <div key={a}>{a}</div>
                  )
                })}
                <p className="action-name">묘사해줄 내용</p>
                {gmGuide.describtion.map(function (a:string) {
                  return (
                    <div key={a}>{a}</div>
                  )
                })}
            </div>
            <div className="rule-job">
              <p className="rule-subtitle">직업 설정집</p>
              <div className="job-contents">
                <div className="job-name">도적</div>
                <div>{jobSetting.thief[0]}</div>
                <br />
                <div className="job-value">가치관</div>
                <div><span className="dice-number">혼돈: </span>{jobSetting.thief[1]}</div>
                <div><span className="dice-number">중립: </span>{jobSetting.thief[2]}</div>
                <div><span className="dice-number">악: </span>{jobSetting.thief[3]}</div>
              </div>
              <div className="job-contents">
                <div className="job-name">마법사</div>
                <div>{jobSetting.wizard[0]}</div>
                <br />
                <div className="job-value">가치관</div>
                <div><span className="dice-number">혼돈: </span>{jobSetting.wizard[1]}</div>
                <div><span className="dice-number">중립: </span>{jobSetting.wizard[2]}</div>
                <div><span className="dice-number">악: </span>{jobSetting.wizard[3]}</div>
              </div>
            </div>                          
            <div className="rule-job">
              <p className="rule-subtitle">직업 설정집</p>
              <div className="job-contents">
                <div className="job-name">사제</div>
                <div>{jobSetting.priest[0]}</div>
                <br />
                <div className="job-value">가치관</div>
                <div><span className="dice-number">혼돈: </span>{jobSetting.priest[1]}</div>
                <div><span className="dice-number">중립: </span>{jobSetting.priest[2]}</div>
                <div><span className="dice-number">악: </span>{jobSetting.priest[3]}</div>
              </div>
              <div className="job-contents">
                <div className="job-name">전사</div>
                <div>{jobSetting.warrior[0]}</div>
                <br />
                <div className="job-value">가치관</div>
                <div><span className="dice-number">혼돈: </span>{jobSetting.warrior[1]}</div>
                <div><span className="dice-number">중립: </span>{jobSetting.warrior[2]}</div>
                <div><span className="dice-number">악: </span>{jobSetting.warrior[3]}</div>
              </div>
            </div>                
            <div className="rule-job">
              <p className="rule-subtitle">직업 설정집</p>
              <div>
                <div className="job-name">사냥꾼</div>
                <div>{jobSetting.hunter[0]}</div>
                <br />
                <div className="job-value">가치관</div>
                <div><span className="dice-number">혼돈: </span>{jobSetting.hunter[1]}</div>
                <div><span className="dice-number">중립: </span>{jobSetting.hunter[2]}</div>
                <div><span className="dice-number">악: </span>{jobSetting.hunter[3]}</div>
              </div>
            </div>
          </Slider>
        </div>
        
    )
}