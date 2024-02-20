import React from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';

const App = () => {

  const word = '공격적인';

  return (
    <div className='px-120r py-48r'>
      <SearchBar
        search={()=>console.log('search')}
        setSearchWord={(e)=>console.log(e.target.value)}
      />
      <TitleHeader 
        word={word}
      />
      <유사단어표현 />
      <활용표현문장
        mean={'뜻'}
        data={[]}
        lastNum={4}
        nowPageNum={1}
        setNowPageNum={()=>{}}
      />
    </div>
  );
};

export default App;