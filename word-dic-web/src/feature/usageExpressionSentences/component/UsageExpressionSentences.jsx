import { useEffect, useMemo, useState } from "react";
import PagiNation from "../../common/component/PagiNation"
import useTrackEvent from "feature/logging/useTrackEvent";
import ExampleSection from "feature/usageExpressionSentences/component/ExampleSection"
import { EXAMPLE_SETENCE_SIZE } from "data/constant";

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
        const start = (page - 1) * EXAMPLE_SETENCE_SIZE;
        const end = start + EXAMPLE_SETENCE_SIZE;

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
                        lastNum={Math.ceil(sentences.length / EXAMPLE_SETENCE_SIZE)}
                    />
                </>)}
        </section>
    )
}

export default 활용표현문장;