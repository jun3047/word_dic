import React from 'react';
import SearchBar from './SearchBar';
import TitleHeader from './TitleHeader';

const Header = ({
  word,
  handleSearch,
}: {
  word: string,
  handleSearch: (text: string) => void,
}) => {

  return (
    <header className='w-full'>
      <SearchBar search={handleSearch} />
      <TitleHeader word={word} />
    </header>
  )
}

export default Header;