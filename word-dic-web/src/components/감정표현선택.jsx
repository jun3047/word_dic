import DoubleDonutChart from './DoubleDonutChart';
import CardList from './CardList';
import { trackEvent } from '../logging/amplitude';
import 기본표현 from '../data/기본표현.json'

const 감정표현선택 = ({
    wordData,
    word,
    isCard,
    setIsCard,
    setWord
}) => {

    const getChartWord = (word) => {

        let foundWord = ''

        Object.keys(기본표현).forEach((key) => {
            const list = 기본표현[key];
            const found = list.find((item) => item.text === word);
            if (found) foundWord = key
        })

        return foundWord
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full lg:w-1/2 min-w-580r px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h3 className="font-bold ml-5r headline-2">감정 표현 선택하기</h3>
                <button onClick={() => {
                        trackEvent(`click_그래프전환-${!isCard ? '이모티콘' : '감정차트'}`)
                        setIsCard()
                    }} className="mr-15r caption-1 font-medium justify-center items-center py-7r px-15r flex gap-5r rounded-full text-[#555555] bg-[#EDEDED]">
                    {
                        isCard ? 
                        <img src="/svg/emojiIcon.svg" alt="emogiIcon" className="w-12r h-12r" />:
                        <img src="/svg/chartIcon.svg" alt="chartIcon" className="w-12r h-12r" />
                    }
                    {isCard ? '이모티콘 보기' : '감정차트 보기'}
                </button>
            </header>
            {
                isCard ? 
                <DoubleDonutChart activeWord={getChartWord(word)} emojiName={wordData['img']} setWord={setWord}/>:
                <CardList word={word} setWord={setWord}/>
            }
        </div>
    )
}


export default 감정표현선택;