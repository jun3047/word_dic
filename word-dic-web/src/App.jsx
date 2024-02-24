import React, {useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
import TitleHeader from './components/TitleHeader';
import 유사단어표현 from './components/유사단어표현';
import 활용표현문장 from './components/활용표현문장';
import 감정표현선택 from './components/감정표현선택';
import 기본표현 from './data/기본표현.json';

const App = () => {
  
  const getWordData = (word) => {

    for (const key in 기본표현) {
      const list = 기본표현[key];
      // 배열 내의 각 객체를 순회
      const found = list.find((item) => item.text === word);
      if (found) return found; // 일치하는 객체를 찾으면 반환
    }
    return null;
  }

  const get유사단어List = (word) => {
    if(!기본표현[word]) return
    return 기본표현[word]
  }

  const initWord = '화나다';
  const initWordData = getWordData(initWord);

  const [word, setWord] = useState(initWord);
  const [wordData, setWordData] = useState(initWordData);
  const [searchWord, setSearchWord] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);
  const [유사표현List, set유사표현List] = useState([]);

  const [onPopup, setOnPopup] = useState(false);

  const [nowAlign, setNowAlign] = useState('대중성');
  const [nowFilterList, setNowFilterList] = useState(['기본표현']);

  useEffect(()=>{

    const _유사표현List = get유사단어List(word)
    if (_유사표현List) set유사표현List(_유사표현List);
    
    const _wordData = getWordData(word)
    if (_wordData) setWordData(_wordData)

  }, [word])
    

  useEffect(()=>{
    
    if(searchWord === '') return setRelatedWords([])

    const _relatedWords = getRelatedWord(searchWord)
    setRelatedWords(_relatedWords)
  },[searchWord]);

  const getRelatedWord = (word) => {

    let relatedWords = [];

    for (const key in 기본표현) {
      const list = 기본표현[key];

      const found = list.filter(item => item.text.includes(word));

      if (found.length > 0) {
        relatedWords = relatedWords.concat(found.map(item => item.text));
      }
    }

    relatedWords = [...new Set(relatedWords)].slice(0, 5);

    return relatedWords;
  }

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
              setWord={(text) => setWord(text)}
              유사표현List={유사표현List}
              word={word}
              nowAlign={nowAlign}
              setNowAlign={setNowAlign}
              onPopup={onPopup}
              changePopup={()=>setOnPopup(!onPopup)}
              nowFilterList={nowFilterList}
              modifyFilterList={modifyFilterList}
            />
            <활용표현문장
              소속={wordData['소속']}
              on활용표현={on활용표현}
              setOn활용표현={()=>setOn활용표현(!on활용표현)}
              mean={wordData['뜻']}
              data={wordData['예문']}
              word={word}
            />
        </div>
        <감정표현선택
          wordData={wordData}
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