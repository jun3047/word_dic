const PagiNation = ({lastNum, nowPageNum, setNowPageNum}) => {

    // 베리에이션에 대해 디자이너한테 문의해야 함

    const isFirst = nowPageNum === 1;
    const isLast = nowPageNum === lastNum;

    return (
        <nav className="flex gap-20r my-12r">
            <img className={`${isFirst ? 'opacity-0' : 'opacity-100'} `}
                src="/svg/leftArraw.svg" alt="왼쪽 화살표"
            />
            <p className="caption-1">
                <span className={`${isLast ?  'text-[#C8C8C8]':'text-[#7C7C7C]'}`}>{nowPageNum}</span>
                <span className="text-[#7C7C7C]">/</span>
                <span className={`${isLast ? 'text-[#7C7C7C]':'text-[#C8C8C8]'}`}>{lastNum}</span>
            </p>
            <img className={`${isLast ? 'opacity-0' : 'opacity-100'}`}
                src="/svg/rightArraw.svg" alt="오른쪽 화살표"
            />
        </nav>
    )
}

export default PagiNation;