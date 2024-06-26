import TrackButton from "feature/logging/TrackButton";

const PagiNation = ({lastNum, nowPageNum, setNowPageNum}) => {

    const isFirst = nowPageNum === 1 || nowPageNum === 0;
    const isLast = nowPageNum === lastNum || lastNum === 0;

    return (
        <nav className="flex gap-20r my-12r">
            <TrackButton
                eventName={`click_활용문장-이전-${nowPageNum - 1}`}
                onClick={()=>{
                    if(isFirst) return
                    setNowPageNum(nowPageNum - 1)
                }}
                className={`${isFirst ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
            <img src="/svg/leftArraw.svg" alt="왼쪽 화살표"/>
            </TrackButton>
            <p className="caption-1">
                <span className={`${isLast ?  'text-[#C8C8C8]':'text-[#7C7C7C]'}`}>{lastNum === 0 ? 0 : nowPageNum}</span>
                <span className="text-[#7C7C7C]">/</span>
                <span className={`${isLast ? 'text-[#7C7C7C]':'text-[#C8C8C8]'}`}>{nowPageNum === 0 ? 0 : lastNum}</span>
            </p>
            <TrackButton
                eventName={`click_활용문장-다음-${nowPageNum + 1}`}
                onClick={()=>{
                    if(isLast) return;
                    setNowPageNum(nowPageNum + 1)
                }}
                className={`${isLast ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <img src="/svg/rightArraw.svg" alt="오른쪽 화살표" />
            </TrackButton>
        </nav>
    )
}

export default PagiNation;