import React, { useEffect, useState, useMemo, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import TitleHeader from '../components/TitleHeader';
import 유사표현단어 from '../components/유사표현단어';
import 활용표현문장 from '../components/활용표현문장';
import 감정표현선택 from '../components/감정표현선택';
import 기본표현 from '../data/기본표현.json';
import { trackEvent } from '../logging/amplitude';

const Home = () => {
  const initWord = '화나다';
  const [word, setWord] = useState(initWord);
  const [searchWord, setSearchWord] = useState('');
  const [onPopup, setOnPopup] = useState(false);
  const [nowAlign, setNowAlign] = useState('친숙성');
  const [nowFilterList, setNowFilterList] = useState(['기본표현']);
  const [on활용표현, setOn활용표현] = useState(true);
  const [isCard, setIsCard] = useState(true);

  const { wordData, 유사표현List } = useFindWordData(word);

  useEffect(() => {
    trackEvent('view_메인-IN');
    const handleBeforeUnload = () => trackEvent('view_메인-OUT');
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const relatedWords = useMemo(() => searchWord ? getRelatedWord(searchWord) : [], [searchWord]);
  
  const handleSearch = useCallback((text) => {
    setWord(text);
    setSearchWord(text);
  }, []);
  const handleSearchWordChange = useCallback((text) => setSearchWord(text), []);
  const changePopupHandler = useCallback(() => {
    trackEvent(`click_분류-${!onPopup ? 'ON' : 'OFF'}`);
    setOnPopup(prev => !prev);
  }, []);
  const modifyFilterListHandler = useCallback((text) => {
    setNowFilterList(prev => prev.includes(text) ? prev.filter((filter) => filter !== text) : [...prev, text]);
  }, []);

  return (
    <div className='flex flex-col px-120r py-48r'>
      <div className='w-full'>
        <SearchBar
          searchWord={searchWord}
          relatedKeywords={relatedWords}
          search={handleSearch}
          setSearchWord={handleSearchWordChange}
          on={relatedWords.length > 0}
        />
        <TitleHeader word={word} on={relatedWords.length > 0} />
      </div>
      <div className='flex flex-col w-full lg:flex-row'>
        <div className='flex flex-col w-full h-full lg:w-1/2'>
          <유사표현단어
            setWord={handleSearch}
            유사표현List={유사표현List}
            word={word}
            nowAlign={nowAlign}
            setNowAlign={setNowAlign}
            onPopup={onPopup}
            changePopup={changePopupHandler}
            nowFilterList={nowFilterList}
            modifyFilterList={modifyFilterListHandler}
          />
          <활용표현문장
            소속={wordData?.소속}
            on활용표현={on활용표현}
            setOn활용표현={() => setOn활용표현(!on활용표현)}
            mean={wordData?.뜻}
            data={wordData.예문}
            dataText={wordData.예문_text}
            word={word}
          />
        </div>
        <감정표현선택
          wordData={wordData}
          word={word}
          setWord={handleSearch}
          isCard={isCard}
          setIsCard={() => setIsCard(!isCard)}
        />
      </div>
    </div>
  );
};

export default Home;


const findWordData = (word) => {
  for (const key in 기본표현) {
    const list = 기본표현[key];
    const found = list.find((item) => item.text === word);
    if (found) return { wordData: found, 유사표현List: list };
  }
  return { wordData: null, 유사표현List: [] };
};

const getRelatedWord = (word) => {
  let relatedWords = [];
  for (const key in 기본표현) {
    const list = 기본표현[key];
    const found = list.filter(item => item.text.includes(word));
    if (found.length > 0) {
      relatedWords = relatedWords.concat(found.map(item => item.text));
    }
  }
  return [...new Set(relatedWords)].slice(0, 5);
};

const useFindWordData = (word) => {
  return useMemo(() => findWordData(word), [word]);
};

