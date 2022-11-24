import "./GameLog.css"

export default function GameLog({signalState} : {signalState : string[]}) {

    return (
        <div id="log-box">
          {/* //* logHistory 내부에 log 배열이 있음
                //* 해당 log 배열을 거꾸로 보여줌 
                //* 기존에 저장되어 있는 빈 로그를 안보이게 설정함*/}
                {signalState.slice(0).reverse().map((signal : any, index : number) => (
                    <div className="signalArray" key={index}> {signal} </div>
                ))}
        </div>
        
    )
}
