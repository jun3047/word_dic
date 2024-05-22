import React, { useMemo } from 'react';
import SearchBar from './SearchBar';
import TitleHeader from './TitleHeader';
import getRelatedWord from 'util/getRelatedWord';

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