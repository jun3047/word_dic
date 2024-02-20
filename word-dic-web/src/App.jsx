import React from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';

const App = () => {
  return (
    <div className=''>
      <SearchBar
        search={()=>console.log('search')}
        setSearchWord={(e)=>console.log(e.target.value)}
      />
      <TitleHeader 
        word={'공격적인'}
      /> 
    </div>
  );
};

export default App;