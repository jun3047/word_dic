import React, { useMemo } from 'react';
import SearchBar from './SearchBar';
import TitleHeader from './TitleHeader';
import getRelatedWord from '@/app/utils/getRelatedWord';

const Header = ({
  word,
  searchWord,
  handleSearch,
  handleSearchWordChange
}: {
  word: string,
  searchWord: string,
  handleSearch: (text: string) => void,
  handleSearchWordChange: (text: string) => void
}) => {

  const relatedWords = useMemo(() => searchWord ? getRelatedWord(searchWord) : [], [searchWord]);

  return (
    <header className='w-full'>
      <SearchBar
        searchWord={searchWord}
        relatedKeywords={relatedWords}
        search={handleSearch}
        setSearchWord={handleSearchWordChange}
        on={relatedWords.length > 0}
      />
      <TitleHeader word={word} />
    </header>
  )
}

export default Header;