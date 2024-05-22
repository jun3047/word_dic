import { useMemo, useCallback } from 'react';
import 기본표현 from 'data/기본표현.json';

const useChartWord = (word) => {

    const getChartWord = useCallback((word) => {
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