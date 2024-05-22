import React from 'react';
import DoubleDonutChart from './DoubleDonutChart';
import CardList from './CardList';
import TrackButton from 'feature/logging/TrackButton';
import useChartWord from 'feature/emotionNav/hook/useChartWord';

const 감정표현선택 = ({ wordData, word, isCard, changeIsCard, setWord }) => {

    const chartWord = useChartWord(word);

    return (
        <nav className="relative flex flex-col items-center justify-center w-full h-full lg:w-1/2 min-w-580r px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h3 className="font-bold ml-5r headline-2">감정 표현 선택하기</h3>
                <TrackButton
                    eventName={`click_그래프전환-${!isCard ? '이모티콘' : '감정차트'}`}
                    onClick={changeIsCard} className="mr-15r caption-1 font-medium justify-center items-center py-7r px-15r flex gap-5r rounded-full text-[#555555] bg-[#EDEDED]">
                    {isCard ? (
                        <img src="/svg/emojiIcon.svg" alt="emogiIcon" className="w-12r h-12r" />
                    ) : (
                        <img src="/svg/chartIcon.svg" alt="chartIcon" className="w-12r h-12r" />
                    )}
                    {isCard ? '이모티콘 보기' : '감정차트 보기'}
                </TrackButton>
            </header>
            {isCard ? (
                <DoubleDonutChart activeWord={chartWord} emojiName={wordData['img']} setWord={setWord} />
            ) : (
                <CardList word={word} setWord={setWord} />
            )}
        </nav>
    );
};

export default 감정표현선택;