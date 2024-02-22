import DoubleDonutChart from './DoubleDonutChart';
import CardList from './CardList';

const 감정표현선택 = ({
    word,
    isCard,
    setIsCard,
    setWord
}) => {

    return (
        <div className="relative flex flex-col items-center justify-center w-1/2 h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h3 className="font-bold ml-5r headline-2">감정 표현 선택하기</h3>
                <button onClick={setIsCard} className="mr-15r caption-1 font-medium justify-center items-center py-7r px-15r flex gap-5r rounded-full text-[#555555] bg-[#EDEDED]">
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
                <DoubleDonutChart emojiName={word} setWord={setWord}/>:
                <CardList setWord={setWord}/>
            }
        </div>
    )
}


export default 감정표현선택;