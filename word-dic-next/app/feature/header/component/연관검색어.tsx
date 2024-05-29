import React from 'react';
import SearchIcon from "@/public/svg/searchIcon.svg";

interface 연관검색어Props {
  relatedKeywords: string[];
  activeWord: string;
  search: (word: string) => void;
}

const 연관검색어: React.FC<연관검색어Props> = ({ relatedKeywords, activeWord, search }) => {
  return (
    <section
      className={`z-10 bg-white rounded-md top-46r right-0r py-15r absolute w-full flex flex-col shadow-md dark:bg-c-grey-70`}>
      {relatedKeywords.map((text, i) => {
        const active = text === activeWord;

        return (
          <button
            key={i}
            onMouseDown={() => search(text)}
            className={`${active ? 'text-[#444444] dark:text-title-2 dark:bg-c-grey-60 bg-[#E9E9E9]' : 'bg-white text-[#ABABAB] dark:bg-c-grey-70 dark:text-title-2'} px-52r relative flex items-center w-[100%] h-30r caption-1 hover:text-[#444444] hover:bg-[#E9E9E9]`}>
            <SearchIcon
              className={`${active ? 'dark:text-title-1' : 'dark:text-c-grey-40'} absolute w-12r h-12r top-8r left-15r dark:text-c-grey-40`}
            />
            {text}
          </button>
        )
      })}
    </section>
  )
}

export default 연관검색어;