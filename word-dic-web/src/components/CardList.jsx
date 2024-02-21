import React from 'react';


const CardList = ({setWord}) => {

    return (
        <div className="mt-35r grid grid-cols-3 max-h-[60vh] overflow-scroll gap-10r">
            {
                ['분노', '행복'].map((text,i) => <CardItem setWord={setWord} key={i} word={text} />)
            }
        </div>
    )
};

const CardItem = ({word, setWord}) => {

    return (
        <article onClick={()=>setWord(word)} className='flex hover:bg-[#E9E9E9] flex-col gap-10r justify-center items-center bg-white border-2 rounded-xl w-160r h-200r border-[#EDEDED]'>
            <img src={`/emoji/${word}.png`} alt={`${word}`} className='w-130r h-130r'/>
            <p className='font-semibold subTitle-1'>{word}</p>
        </article>
    )
}


export default CardList;