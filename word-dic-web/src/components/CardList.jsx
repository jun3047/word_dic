import React from 'react';
import { trackEvent } from '../logging/amplitude';


const emotionList = [
    '화나다',
    '감동하다',
    '행복하다',
    '편안하다',
    '슬프다',
    '무섭다',
    '지루하다',
    '싫다',

    '증오하다',
    '화나다',

    '감동하다',
    '부럽다',
    '반하다',
    '선호하다',
    '애틋하다',

    '기쁘다',
    '신나다',
    '좋다',
    '행복하다',

    '안정되다',
    '편안하다',
    '만족하다',
    '공감하다',
    '후련하다',

    '미안하다',
    '눈물겹다',
    '서운하다',
    '억울하다',
    '슬프다',
    '외롭다',
    '우울하다',
    '아쉽다',
    '실망하다',
    '후회하다',
    '그립다',

    '놀라다',
    '무섭다',
    '불쾌하다',
    '조마조마하다',

    '심심하다',
    '지루하다',

    '우습다',
    '부끄럽다',
    '불편하다',
    '괴롭다',
    '귀찮다',
    '싫다',
    '짜증내다',
]

const CardList = ({setWord, word}) => {

    return (
        <div className="mt-35r grid grid-cols-3 max-h-[60vh] overflow-scroll gap-10r">
            {
                emotionList.map((text,i) => <CardItem active={word === text} setWord={setWord} key={i} word={text} />)
            }
        </div>
    )
};

const CardItem = ({word, setWord, active}) => {

    return (
        <article onClick={()=>{
                trackEvent(`click_이모티콘-${word}`)
                setWord(word)
            }} className={`flex ${active ? "bg-[#E9E9E9]" : 'bg-white'} hover:bg-[#E9E9E9] flex-col gap-10r justify-center items-center border-2 rounded-xl w-160r h-200r border-[#EDEDED]`}>
            <img src={`/emoji/${word}.png`} alt={`${word}`} className='w-130r h-130r'/>
            <p className='font-semibold subTitle-1'>{word}</p>
        </article>
    )
}


export default CardList;