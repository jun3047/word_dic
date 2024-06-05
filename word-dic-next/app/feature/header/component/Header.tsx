import React from 'react';
import SearchBar from './SearchBar';
import TitleHeader from './TitleHeader';

const Header = ({
  기본표현,
  word,
  handleSearch,
}: {
  기본표현: Record<string, Expression[]>
  word: string,
  handleSearch: (text: string) => void,
}) => {

  return (
    <header className='w-full'>
      <SearchBar 기본표현={기본표현} search={handleSearch} />
      <TitleHeader word={word} />
    </header>
  )
}

export default Header;