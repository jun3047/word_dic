import React, {useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';
import 감정표현선택 from './components/감정표현선택';

const App = () => {


  const word = '공격적인';

  const [searchWord, setSearchWord] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);

  useEffect(()=>{
    
    if(searchWord === '') return setRelatedWords([])

    const _relatedWords = getRelatedWord(searchWord)
    setRelatedWords(_relatedWords)
  },[searchWord]);

  const getRelatedWord = (word) => {
    // 해당 단어가 포함된 단어들을 가져오는 코드 작성해야 함
    return ['공격적인', '격적인', '격렬한' ]
  }

  const [onPopup, setOnPopup] = useState(false);

  const [nowAlign, setNowAlign] = useState('대중성');
  const [nowFilterList, setNowFilterList] = useState(['기본표현']);

  const modifyFilterList = (text) => {
    nowFilterList.includes(text) ?
      setNowFilterList(nowFilterList.filter((filter) => filter !== text)):
      setNowFilterList([...nowFilterList, text])
  }

  return (
    <div className='flex flex-col px-120r py-48r'>
      <div className='w-full'>
        <SearchBar
          relatedKeywords={relatedWords}
          search={()=>console.log('search')}
          setSearchWord={(e)=>setSearchWord(e.target.value)}
          on={relatedWords.length > 0}
        />
        <TitleHeader 
          word={word}
          on={relatedWords.length > 0}
        />
      </div>
      <div className='flex w-full'>
        <div className='flex flex-col w-1/2 h-full'>
            <유사단어표현
              nowAlign={nowAlign}
              setNowAlign={setNowAlign}
              onPopup={onPopup}
              changePopup={()=>setOnPopup(!onPopup)}
              nowFilterList={nowFilterList}
              modifyFilterList={modifyFilterList}
            />
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