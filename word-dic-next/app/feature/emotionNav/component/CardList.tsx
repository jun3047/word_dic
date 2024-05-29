import React from 'react';
import emotionList from '@/app/data/emotionList';
import TrackButton from '@/app/feature/logging/TrackButton';

const CardList = ({ setWord, word }: {
    setWord: (text: string) => void;
    word: string
}) => {

    return (
        <article className="mt-35r grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 max-h-[60vh] overflow-scroll gap-10r dark:">
            {emotionList.map((text, i) => <CardItem active={word === text} setWord={setWord} key={i} word={text} />)}
        </article>
    )
};

const CardItem = ({ word, setWord, active }: {
    word: string;
    setWord: (text: string) => void;
    active: boolean
}) => {

    return (
        <TrackButton
            eventName={`click_이모티콘-${word}`}
            onClick={() => { setWord(word) }
            }>
            <section className={`dark:text-title-2 flex ${active ? "bg-[#E9E9E9] dark:bg-c-grey-70" : 'bg-white dark:bg-bg'} hover:bg-[#E9E9E9] dark:hover:bg-c-grey-70 flex-col gap-10r justify-center items-center border-2 rounded-xl w-160r h-200r border-[#EDEDED] dark:border-[#636363]`}>
                <img src={`/emoji/${word}.png`} alt={`${word}`} className='w-130r h-130r' />
                <p className='font-semibold subTitle-1'>{word}</p>
            </section>
        </TrackButton>
    )
}


export default CardList;