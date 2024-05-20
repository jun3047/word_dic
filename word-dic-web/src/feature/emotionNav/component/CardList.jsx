import React from 'react';
import emotionList from '../../../data/emotionList';
import TrackButton from '../../logging/useTrackEvent';

const CardList = ({setWord, word}) => {

    return (
        <article className="mt-35r grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 max-h-[60vh] overflow-scroll gap-10r">
            {emotionList.map((text,i) => <CardItem active={word === text} setWord={setWord} key={i} word={text} />)}
        </article>
    )
};

const CardItem = ({word, setWord, active}) => {

    return (
        <TrackButton 
                eventName={`click_이모티콘-${word}`}
                onClick={()=>{setWord(word)}
            }>
            <section className={`flex ${active ? "bg-[#E9E9E9]" : 'bg-white'} hover:bg-[#E9E9E9] flex-col gap-10r justify-center items-center border-2 rounded-xl w-160r h-200r border-[#EDEDED]`}>
                <img src={`/emoji/${word}.png`} alt={`${word}`} className='w-130r h-130r'/>
                <p className='font-semibold subTitle-1'>{word}</p>
            </section>
        </TrackButton>
    )
}


export default CardList;