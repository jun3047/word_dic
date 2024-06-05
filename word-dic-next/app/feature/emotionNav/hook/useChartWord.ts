import { useMemo, useCallback } from 'react';

const useChartWord = (word: string, 기본표현: Record<string, Expression[]>) => {

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