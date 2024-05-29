import { useState, useMemo, useEffect } from 'react';
import { EXAMPLE_SETENCE_SIZE } from '@/app/data/constant';

const useSentencePagintion = (sentences: string[], sentenceWords: string[]): UseSentencePaginationResult => {
    const [page, setPage] = useState(1);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * EXAMPLE_SETENCE_SIZE;
        const end = start + EXAMPLE_SETENCE_SIZE;

        return sentences.slice(start, end).map((text, i) => {
            const sentenceWord = sentenceWords[i + start];
            const parts = text.split(sentenceWord);
            return [parts[0], sentenceWord, parts[1]];
        });
    }, [sentences, page, sentenceWords]);

    useEffect(() => {
        setPage(1);
    }, [sentences]);

    return { page, setPage, paginatedList };
};

export default useSentencePagintion;