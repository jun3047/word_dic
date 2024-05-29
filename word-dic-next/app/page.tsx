"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import 유사표현단어 from '@/app/feature/similarExpressionWords/component/SimilarExpressionWords';
import 활용표현문장 from '@/app/feature/usageExpressionSentences/component/UsageExpressionSentences';
import 감정표현선택 from '@/app/feature/emotionNav/component/감정표현선택';
import 기본표현 from '@/app/data/기본표현.json';
import Header from '@/app/feature/header/component/Header';
import { trackEvent } from '@/app/feature/logging/amplitude';
import useTrackEvent from '@/app/feature/logging/useTrackEvent';
import { findWordData } from '@/app/utils/findWordData';
import useToggle from '@/app/feature/common/hook/useToggle';

export default function Home() {
  const initWord = '화나다';
  const [word, setWord] = useState<string>(initWord);
  const { wordData, 유사표현List } = useMemo(() => findWordData(word, 기본표현), [word]);

  useTrackEvent('view_메인-IN');

  useEffect(() => {
    const handleBeforeUnload = () => trackEvent('view_메인-OUT');

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSearch = useCallback((text: string) => {
    setWord(text);
  }, [setWord]);

  return (
    <main className='relative flex flex-col w-full h-full min-h-[100vh] duration-300 bg-white ransition-colors dark:bg-bg px-120r py-48r'>
      <Header
        word={word}
        handleSearch={handleSearch}
      />
      <section className='flex flex-col w-full h-full lg:flex-row'>
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
        />
      </section>
    </main>
  );
};