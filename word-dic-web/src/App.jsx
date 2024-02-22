import React, {useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';
import 감정표현선택 from './components/감정표현선택';
import 기본표현 from './data/기본표현.json';

const App = () => {

  const getWordData = (word) => 기본표현[word][0]
  const get유사단어List = (word) => 기본표현[word]

  const initWord = '놀라다';
  const initWordData = getWordData(initWord);

  const [word, setWord] = useState('놀라다');
  const [wordData, setWordData] = useState(initWordData);
  const [searchWord, setSearchWord] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);
  
  useEffect(()=>{

    const _wordData = getWordData(word)
    setWordData(_wordData)

  }, [word])
    

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
  const [isCard, setIsCard] = useState(true);

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
              유사표현List={get유사단어List(word)}
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
              mean={wordData['뜻']}
              data={wordData['예문']}
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