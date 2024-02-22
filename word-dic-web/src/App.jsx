import React, {useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';
import 감정표현선택 from './components/감정표현선택';

const App = () => {

  const [word, setWord] = useState('화나다');

  const [searchWord, setSearchWord] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);

  useEffect(()=>{
    
    if(searchWord === '') return setRelatedWords([])

    const _relatedWords = getRelatedWord(searchWord)
    setRelatedWords(_relatedWords)
  },[searchWord]);

  const getRelatedWord = (word) => {
    // 해당 단어가 포함된 단어들을 가져오는 코드 작성해야 함
    return ['행복하다', '싫다' ]
  }

  const [onPopup, setOnPopup] = useState(false);

  const [nowAlign, setNowAlign] = useState('대중성');
  const [nowFilterList, setNowFilterList] = useState(['기본표현']);

  const modifyFilterList = (text) => {
    nowFilterList.includes(text) ?
      setNowFilterList(nowFilterList.filter((filter) => filter !== text)):
      setNowFilterList([...nowFilterList, text])
  }


  const [on활용표현, setOn활용표현] = useState(true);

  const [isCard, setIsCard] = useState(false);

  return (
    <div className='flex flex-col px-120r py-48r'>
      <div className='w-full'>
        <SearchBar
          setRelatedWords={setRelatedWords}
          relatedKeywords={relatedWords}
          search={(text)=>setWord(text)}
          setSearchWord={(text)=>setSearchWord(text)}
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
              on활용표현={on활용표현}
              setOn활용표현={()=>setOn활용표현(!on활용표현)}
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
        <감정표현선택
          word={word}
          setWord={(text) => setWord(text)}
          isCard={isCard}
          setIsCard={()=>setIsCard(!isCard)}
        />
      </div>
    </div>
  );
};

export default App;