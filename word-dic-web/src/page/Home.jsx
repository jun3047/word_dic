import React, { useEffect, useState, useMemo, useCallback } from 'react';
import 유사표현단어 from 'feature/similarExpressionWords/component/SimilarExpressionWords';
import 활용표현문장 from 'feature/usageExpressionSentences/component/UsageExpressionSentences';
import 감정표현선택 from 'feature/emotionNav/component/감정표현선택';
import 기본표현 from 'data/기본표현.json';
import Header from 'feature/header/component/Header';
import { trackEvent } from 'feature/logging/amplitude';
import useTrackEvent from 'feature/logging/useTrackEvent';
import { findWordData } from 'util/findWordData';
import useToggle from 'feature/common/hook/useToggle';

const Home = () => {
  const initWord = '화나다';
  const [word, setWord] = useState(initWord);
  const [searchWord, setSearchWord] = useState('');
  const [isCard, changeIsCard] = useToggle(true);
  const { wordData, 유사표현List } = useMemo(() => findWordData(word, 기본표현), [word]);

  useTrackEvent('view_메인-IN');

  useEffect(() => {
    const handleBeforeUnload = () => trackEvent('view_메인-OUT');
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSearch = (text) => {
    setWord(text);
    setSearchWord(text);
  };
  const handleSearchWordChange = (text) => setSearchWord(text);

  return (
    <main className='flex flex-col px-120r py-48r'>
      <Header
        word={word}
        searchWord={searchWord}
        handleSearch={handleSearch}
        handleSearchWordChange={handleSearchWordChange}
      />
      <section className='flex flex-col w-full lg:flex-row'>
        <section className='flex flex-col w-full h-full lg:w-1/2'>
          <유사표현단어
            setWord={handleSearch}
            word={word}
            유사표현List={유사표현List}
          />
          <활용표현문장 wordData={wordData} />
        </section>
        <감정표현선택
          wordData={wordData}
          word={word}
          setWord={handleSearch}
          isCard={isCard}
          changeIsCard={changeIsCard}
        />
      </section>
    </main>
  );
};

export default Home;