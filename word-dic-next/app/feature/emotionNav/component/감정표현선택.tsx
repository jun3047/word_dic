import React from 'react';
import DoubleDonutChart from './DoubleDonutChart';
import CardList from './CardList';
import TrackButton from '@/app/feature/logging/TrackButton';
import useChartWord from '@/app/feature/emotionNav/hook/useChartWord';
import EmojiIcon from "@/public/svg/emojiIcon.svg";
import ChartIcon from "@/public/svg/chartIcon.svg";
import EmojiDarkIcon from "@/public/svg/emoji_dark.svg";
import ChartDarkIcon from "@/public/svg/chartIcon.svg";
import useDarkMode from '@/app/feature/header/hook/useDarkMode';

const 감정표현선택 = ({ wordData, word, isCard, changeIsCard, setWord }: {
    wordData: Expression;
    word: string;
    isCard: boolean;
    changeIsCard: () => void;
    setWord: (text: string) => void
}) => {

    const chartWord = useChartWord(word);
    const [isDarkMode] = useDarkMode();

    return (
        <nav className="relative flex flex-col items-center justify-center w-full h-full lg:w-1/2 min-w-580r px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h3 className="font-bold ml-5r headline-2 dark:text-title-2">감정 표현 선택하기</h3>
                <TrackButton
                    eventName={`click_그래프전환-${!isCard ? '이모티콘' : '감정차트'}`}
                    onClick={changeIsCard} className="dark:bg-c-grey-60 dark:text-c-grey-20 mr-15r caption-1 font-medium justify-center items-center py-7r px-15r flex gap-5r rounded-full text-[#555555] bg-[#EDEDED]">
                    {isCard ? (
                        isDarkMode ?
                            <EmojiDarkIcon
                                alt="emogiIcon"
                                className="w-14r h-14r"
                            /> : <EmojiIcon
                                alt="emogiIcon"
                                className="w-14r h-14r"
                            />
                    ) : (
                        isDarkMode ?
                            <ChartDarkIcon
                                alt="chartIcon"
                                className="w-14r h-14r"
                            /> :
                            <ChartIcon
                                alt="chartIcon"
                                className="w-14r h-14r"
                            />
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