import React from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';
import 감정표현선택 from './components/감정표현선택';

const App = () => {

  const word = '공격적인';

  const relatedOn = false;

  return (
    <div className='flex flex-col px-120r py-48r'>
      <div className='w-full'>
        <SearchBar
          on={relatedOn}
          search={()=>console.log('search')}
          setSearchWord={(e)=>console.log(e.target.value)}
        />
        <TitleHeader 
          word={word}
          on={relatedOn}
        />
      </div>
      <div className='flex w-full'>
        <div className='flex flex-col w-1/2 h-full'>
            <유사단어표현 />
            <활용표현문장
              mean={'뜻이랍니다.'}
              data={[
                '공격적인 사람 좀 보소',
                '너무 공격적인 표현은 좀 자제해야겠어',
              ]}
              lastNum={4}
              nowPageNum={1}
              setNowPageNum={()=>{}}
              word={word}
            />
        </div>
        <감정표현선택 />
      </div>
    </div>
  );
};

export default App;