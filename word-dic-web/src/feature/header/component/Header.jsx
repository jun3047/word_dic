import React, { useMemo } from 'react';
import 기본표현 from 'data/기본표현.json';
import SearchBar from './SearchBar';
import TitleHeader from './TitleHeader';

const Header = ({
    word,
    searchWord,
    handleSearch,
    handleSearchWordChange
}) => {

    const relatedWords = useMemo(() => searchWord ? getRelatedWord(searchWord) : [], [searchWord]);
    
    return(
        <header className='w-full'>
            <SearchBar
              searchWord={searchWord}
              relatedKeywords={relatedWords}
              search={handleSearch}
              setSearchWord={handleSearchWordChange}
              on={relatedWords.length > 0}
            />
            <TitleHeader word={word} on={relatedWords.length > 0} />
      </header>
    )
}

export default Header;

const getRelatedWord = (word) => {
    let relatedWords = [];
    for (const key in 기본표현) {
      const list = 기본표현[key];
      const found = list.filter(item => item.text.includes(word));
      if (found.length > 0) {
        relatedWords = relatedWords.concat(found.map(item => item.text));
      }
    }
    return [...new Set(relatedWords)].slice(0, 5);
  };