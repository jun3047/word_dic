import React from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';

const App = () => {

  const word = '공격적인';

  return (
    <div className=''>
      <SearchBar
        search={()=>console.log('search')}
        setSearchWord={(e)=>console.log(e.target.value)}
      />
      <TitleHeader 
        word={word}
        /> 
      <유사단어표현
        
      />
    </div>
  );
};

export default App;