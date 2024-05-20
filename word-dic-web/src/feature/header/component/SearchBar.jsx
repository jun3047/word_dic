import React, { useState, useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '../../logging/amplitude';
import useTrackEvent from '../../logging/useTrackEvent';
import 연관검색어 from './연관검색어';

const SearchBar = ({ relatedKeywords, setSearchWord, searchWord, on, search }) => {
    const [activeWord, setActiveWord] = useState(relatedKeywords[0]);
    const [inputFocus, setInputFocus] = useState(false);
    const inputRef = useRef(null);
    
    useTrackEvent(
        `view_연관검색어-${searchWord}`,
        [inputFocus, on, searchWord],
        inputFocus && on && searchWord
    );

    const handleKeyPress = useCallback((e) => {
        if (relatedKeywords.length === 0) return;

        const nowWordIndex = relatedKeywords.indexOf(activeWord);
        const downWordIndex = nowWordIndex + 1 === relatedKeywords.length ? 0 : nowWordIndex + 1;
        const upWordIndex = nowWordIndex - 1 < 0 ? relatedKeywords.length - 1 : nowWordIndex - 1;

        if (e.key === 'Enter') {
            inputRef.current.blur();
            const nextSearchWord = relatedKeywords[nowWordIndex];
            setSearchWord(nextSearchWord);
            search(nextSearchWord);
            trackEvent(`type_검색-${nextSearchWord}`);
        } else if (e.key === 'ArrowDown') {
            setActiveWord(relatedKeywords[downWordIndex]);
            trackEvent('type_연관검색어-아래이동');
        } else if (e.key === 'ArrowUp') {
            setActiveWord(relatedKeywords[upWordIndex]);
            trackEvent('type_연관검색어-위이동');
        }
    }, [activeWord, relatedKeywords, setSearchWord, search]);

    const handleFocus = useCallback(() => {
        setInputFocus(true);
        trackEvent('click_검색바');
    }, []);

    const handleBlur = useCallback(() => {
        setInputFocus(false);
    }, []);

    useEffect(() => {
        if (relatedKeywords.length > 0) {
            setActiveWord(relatedKeywords[0]);
        }
    }, [relatedKeywords]);

    return (
        <header className="flex items-center justify-center w-full h-83r">
            <form className={`${inputFocus && on ? 'shadow-md' : ''} relative py-13r gap-18r px-15r flex items-center justify-start h-46r w-533r bg-[#F1F1F1] rounded`}>
                <img className="left-0 w-19r h-19r" src="/svg/searchIcon.svg" alt="search" />
                <input
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchWord(e.target.value)}
                    className="outline-none font-semibold text-[#444444] w-full h-full bg-inherit"
                    type="text"
                    placeholder="검색할 단어를 적어주세요"
                    value={searchWord}
                />
                {(inputFocus && on) &&
                    <연관검색어
                        activeWord={activeWord}
                        search={search}
                        relatedKeywords={relatedKeywords}
                    />
                }
            </form>
        </header>
    );
};

export default SearchBar;
