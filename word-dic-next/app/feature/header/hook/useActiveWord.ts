import { useState, useEffect } from 'react';

const useActiveWord = (relatedKeywords: string[]) => {
    const [activeWord, setActiveWord] = useState(relatedKeywords[0]);

    useEffect(() => {
        if (relatedKeywords.length > 0) {
            setActiveWord(relatedKeywords[0]);
        }
    }, [relatedKeywords]);

    return [activeWord, setActiveWord] as const;
};

export default useActiveWord;