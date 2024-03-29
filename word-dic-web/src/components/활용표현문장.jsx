import { useEffect, useState } from "react";
import PagiNation from "./PagiNation"
import WordBox from "./WordBox"

const PAGE_SIZE = 2; // 페이지당 표시할 항목의 수

const 활용표현문장 = (
    {
        word,
        mean,
        data,
        dataText,
        on활용표현,
        setOn활용표현,
        소속
    }) => {

    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [paginatedList, setPaginatedList] = useState([]); // 현재 페이지에 해당하는 리스트
  
    // 페이지 변경이나 유사표현List 변경 시 분할 리스트 업데이트

    useEffect(() => {
        setPage(1);
    }, [word]);

    useEffect(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const _data = data.slice(start, end).map((text, i) => {

            const _dataText = dataText[i + start]
            const parts = text.split(_dataText);
            return [parts[0], _dataText, parts[1]];
        });        

        setPaginatedList(_data);

    }, [data, page]);


    return (
        <section className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold ml-37r headline-2">활용 문장 표현</h2>
                <div onClick={setOn활용표현} className="flex items-center justify-center w-40r h-40r">
                    <img className={`w-21r h-15r transform ${on활용표현 || "rotate-180"}`} src="/svg/downArraw_active.svg" alt="alignIcon"/>
                </div>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            {
                on활용표현 ? 
                (<>
                <div className="flex flex-col justify-start w-full px-8r">
                    {
                        mean !== undefined && (
                            <p className="body-text text-[#636363] h-54r w-full flex items-center">
                                <span className="font-semibold text-[#434343] mr-4r">[뜻]</span>
                                {mean}
                            </p>
                        )
                    }
                    {
                        paginatedList.map((text, i) => (
                                <p key={i} className="body-text text-[#636363] h-54r w-full flex items-center">
                                    <span className="font-semibold text-[#434343] w-40r">{i+1+(page-1)*2}.</span>
                                    <p className="flex items-center gap-6r">
                                    {text[0]}
                                    <WordBox active={true} word={text[1]} 소속={소속} />
                                    {text[2]}
                                    </p>
                                </p>
                            )
                        )
                    }
                </div>
                <PagiNation
                    nowPageNum={page}
                    setNowPageNum={setPage}
                    lastNum={Math.ceil(data.length / PAGE_SIZE)}
                />
                </>)
                :
                null
            }
        </section>
    )
}


export default 활용표현문장;