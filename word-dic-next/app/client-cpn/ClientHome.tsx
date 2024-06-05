'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/app/feature/logging/amplitude';
import useTrackEvent from '@/app/feature/logging/useTrackEvent';
import Header from '@/app/feature/header/component/Header';
import { findWordData } from '@/app/utils/findWordData';
import 유사표현단어 from '../feature/similarExpressionWords/component/SimilarExpressionWords';
import 활용표현문장 from '../feature/usageExpressionSentences/component/UsageExpressionSentences';
import 감정표현선택 from '../feature/emotionNav/component/감정표현선택';

export default function ClientHome({
    basicWordData
}: {
    basicWordData: Record<string, Expression[]>
}) {

    const initWord = '화나다';
    const [word, setWord] = useState<string>(initWord);
    const { wordData, 유사표현List } = useMemo(() => findWordData(word, basicWordData), [word]);

    useTrackEvent('view_메인-IN');

    useEffect(() => {
        const handleBeforeUnload = () => trackEvent('view_메인-OUT')

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
                기본표현={basicWordData}
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
                    기본표현={basicWordData}
                    wordData={wordData}
                    word={word}
                    setWord={handleSearch}
                />
            </section>
        </main>
    );
}