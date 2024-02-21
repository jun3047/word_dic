import React from 'react';


const CardList = ({}) => {

    return (
        <div className="mt-35r grid grid-cols-3 max-h-[60vh] overflow-scroll gap-10r">
            {
                [1,2,3,4,5,6,7,8,9,10].map((v,i) => <CardItem key={i} word={'분노'} />)
            }
        </div>
    )
};

const CardItem = ({word}) => {

    return (
        <article className='flex flex-col gap-10r justify-center items-center bg-white border-2 rounded-xl w-160r h-200r border-[#EDEDED]'>
            <img src={`/emoji/${word}.png`} alt={`${word}`} className='w-130r h-130r'/>
            <p className='font-semibold subTitle-1'>{word}</p>
        </article>
    )
}


export default CardList;