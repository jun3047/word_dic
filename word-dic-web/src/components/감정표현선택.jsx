import DoubleDonutChart from './DoubleDonutChart';
import CardList from './CardList';

const 감정표현선택 = ({}) => {

    const graphType = 'card'; // chart | card
    const isCard = graphType === 'card'

    return (
        <div className="relative px-40r flex flex-col items-center justify-center w-[50%] h-[100%] min-w-600r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h3 className="font-bold ml-5r headline-2">감정 표현 선택하기</h3>
                <button className="mr-15r caption-1 font-medium justify-center items-center py-7r px-15r flex gap-5r rounded-full text-[#555555] bg-[#EDEDED]">
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
                <CardList /> :
                <DoubleDonutChart />
            }
        </div>
    )
}


export default 감정표현선택;