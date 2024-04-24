import { trackEvent } from "../logging/amplitude";

const PagiNation = ({lastNum, nowPageNum, setNowPageNum}) => {

    const isFirst = nowPageNum === 1;
    const isLast = nowPageNum === lastNum;

    return (
        <nav className="flex gap-20r my-12r">
            <img onClick={()=>{
                if(isFirst) return
                setNowPageNum(nowPageNum - 1)
                trackEvent(`click_활용문장-이전-${nowPageNum - 1}`)
            }} className={`${isFirst ? 'opacity-0' : 'opacity-100'} `}
                src="/svg/leftArraw.svg" alt="왼쪽 화살표"
            />
            <p className="caption-1">
                <span className={`${isLast ?  'text-[#C8C8C8]':'text-[#7C7C7C]'}`}>{nowPageNum}</span>
                <span className="text-[#7C7C7C]">/</span>
                <span className={`${isLast ? 'text-[#7C7C7C]':'text-[#C8C8C8]'}`}>{lastNum}</span>
            </p>
            <img onClick={()=>{
                if(isFirst) return
                setNowPageNum(nowPageNum + 1)
                trackEvent(`click_활용문장-다음-${nowPageNum + 1}`)
            }} className={`${isLast ? 'opacity-0' : 'opacity-100'}`}
                src="/svg/rightArraw.svg" alt="오른쪽 화살표"
            />
        </nav>
    )
}

export default PagiNation;