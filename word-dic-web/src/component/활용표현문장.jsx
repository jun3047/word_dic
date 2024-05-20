import { useEffect, useMemo, useState } from "react";
import PagiNation from "./PagiNation"
import WordBox from "./WordBox"
import { useTrackEvent } from "../logging/Log";

const PAGE_SIZE = 3; // 페이지당 표시할 항목의 수

const 활용표현문장 = (
    {
        word,
        wordData,
    }) => {

    const [page, setPage] = useState(1);
    const [on활용표현, setOn활용표현] = useState(true);

    const { 소속, mean, sentences, sentenceWords} = {
        소속: wordData?.소속,
        mean: wordData?.뜻,
        sentences: wordData.예문,
        sentenceWords: wordData.예문_text,
    };
    
    const paginatedList = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        return sentences.slice(start, end).map((text, i) => {
            const sentenceWord = sentenceWords[i + start]
            const parts = text.split(sentenceWord);
            return [parts[0], sentenceWord, parts[1]];
        });
    }, [sentences, page, sentenceWords])

    useTrackEvent(`click_활용문장-${on활용표현}`, [on활용표현]);
    
    useEffect(() => {
        setPage(1);
    }, [word]);

    return (
        <section className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold headline-2">활용 문장 표현</h2>
                <button onClick={()=>setOn활용표현(!on활용표현)} className="flex items-center justify-center w-40r h-40r">
                    <img className={`w-21r h-15r transform ${on활용표현 || "rotate-180"}`} src="/svg/downArraw_active.svg" alt="alignIcon" />
                </button>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]" />
            {on활용표현 &&
                (<>
                    <ExampleSection
                        mean={mean}
                        paginatedList={paginatedList}
                        소속={소속}
                        page={page}
                    />
                    <PagiNation
                        nowPageNum={page}
                        setNowPageNum={setPage}
                        lastNum={Math.ceil(sentences.length / PAGE_SIZE)}
                    />
                </>)}
        </section>
    )
}

const ExampleSection = ({mean, paginatedList, 소속, page}) => {
    return (
        <section className="flex flex-col justify-start w-full px-8r">
            {mean && (
                <p className="body-text text-[#636363] py-10r w-full flex items-start">
                    <span className="font-semibold mt-0 text-[#434343] mr-4r">[뜻]</span>
                    {mean}
                </p>
            )}
            {paginatedList.map((text, i) => (
                <p key={i} className="body-text text-[#636363] py-10r w-full flex items-start">
                    <span className="font-semibold text-[#434343] w-40r">{i + 1 + (page - 1) * PAGE_SIZE}.</span>
                    <p className="flex flex-wrap">
                        <NotWordBox texts={text[0]} />
                        <WordBox active={true} word={text[1]} 소속={소속} />
                        <NotWordBox texts={text[2]} />
                    </p>
                </p>
            )
            )}
        </section>
    )
}

const NotWordBox = ({texts}) => {
    return texts && texts.split(' ').map((text, i) => <span key={i} className="m-3r">{text}</span>)
}

export default 활용표현문장;