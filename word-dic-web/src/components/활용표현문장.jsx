import PagiNation from "./PagiNation"

const 활용표현문장 = ({word, mean, data, lastNum, nowPageNum, setNowPageNum}) => {

    // nowData를 만들고, word가 포함된 부분은 특수처리하기

    return (
        <section className="px-40r flex flex-col items-center justify-center w-[50%] h-[100%] min-w-600r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold ml-37r headline-2">활용 표현 문장</h2>
                <div className="flex items-center justify-center w-40r h-40r">
                    <img className="w-21r h-15r" src="/svg/downArraw_active.svg" alt="alignIcon"/>
                </div>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <div className="flex flex-col justify-start w-full px-8r">
            <p className="body-text text-[#636363] h-54r w-full flex items-center">
                <span className="font-semibold text-[#434343] mr-4r">[뜻]</span> {mean}
            </p>
            <p className="body-text text-[#636363] h-54r w-full flex items-center">
                <span className="font-semibold text-[#434343] w-40r">1.</span> {mean}
            </p>
            <p className="body-text text-[#636363] h-54r w-full flex items-center">
                <span className="font-semibold text-[#434343] w-40r">2.</span> {mean}
            </p>
            </div>
            <PagiNation
                lastNum={lastNum}
                nowPageNum={4}
                setNowPageNum={setNowPageNum}
            />
        </section>
    )
}


export default 활용표현문장;