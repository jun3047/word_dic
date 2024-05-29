import { useMemo, useCallback } from 'react';
import 기본표현 from '@/app/data/기본표현.json';

const useChartWord = (word: string) => {

    const getChartWord = useCallback((word: string) => {
        for (const key in 기본표현) {
            const list = 기본표현[key];
            const found = list.find((item) => item.text === word);
            if (found) return key;
        }
        return '';
    }, []);

    return useMemo(() => getChartWord(word), [word]);
}

export default useChartWord;