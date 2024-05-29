import PagiNation from "@/app/feature/common/component/PagiNation"
import useTrackEvent from "@/app/feature/logging/useTrackEvent";
import ExampleSection from "@/app/feature/usageExpressionSentences/component/ExampleSection"
import { EXAMPLE_SETENCE_SIZE } from "@/app/data/constant";
import useSentencePagintion from "@/app/feature/usageExpressionSentences/hook/useSentencePagintion";
import useToggle from "@/app/feature/common/hook/useToggle";
import UpArrowIcon from '@/public/svg/upArraw_active.svg';


const 활용표현문장 = ({ wordData }: { wordData: Expression }) => {

    const { 소속, mean, sentences, sentenceWords } = {
        mean: wordData?.뜻,
        소속: wordData.소속,
        sentences: wordData.예문,
        sentenceWords: wordData.예문_text,
    };

    const {
        page,
        setPage,
        paginatedList
    } = useSentencePagintion(sentences, sentenceWords);

    const [on활용표현, change활용표현] = useToggle(true);

    useTrackEvent(`click_활용문장-${on활용표현}`, [on활용표현]);

    return (
        <section className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold headline-2 dark:text-title-2">활용 문장 표현</h2>
                <button onClick={() => change활용표현()} className="flex items-center justify-center w-40r h-40r">
                    <UpArrowIcon
                        className={`w-21r h-15r transform ${on활용표현 || "rotate-180"}`}
                        alt="alignIcon"
                    />
                </button>
            </header>
            <hr className="w-full bg-[#E5E5E5] border-0 h-1r dark:bg-c-grey-60" />
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