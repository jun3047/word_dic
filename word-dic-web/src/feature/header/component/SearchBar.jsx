import React, { useState, useEffect, useRef, useCallback } from 'react';
import { trackEvent } from 'feature/logging/amplitude';
import useTrackEvent from 'feature/logging/useTrackEvent';
import 연관검색어 from './연관검색어';
import useActiveWord from 'feature/header/hook/useActiveWord';
import useInputFocus from 'feature/header/hook/useInputFocus';
import useSearchKeyPressHandler from '../hook/useSearchKeyPressHandler';
import DarkModeToggle from 'feature/header/component/darkModeToggle';
import {ReactComponent as SearchIcon} from "svg/searchIcon.svg";

const SearchBar = ({ relatedKeywords, setSearchWord, searchWord, on, search }) => {
    const [activeWord, setActiveWord] = useActiveWord(relatedKeywords);
    const [inputFocus, handleFocus, handleBlur] = useInputFocus(false);
    
    const [inputRef, handleKeyPress] = useSearchKeyPressHandler(
        relatedKeywords,
        activeWord,
        setActiveWord,
        setSearchWord,
        search,
    );

    useTrackEvent(
        `view_연관검색어-${searchWord}`,
        [inputFocus, on, searchWord],
        inputFocus && on && searchWord
    );

    return (
        <header className="flex items-center justify-center w-full h-83r">
            <DarkModeToggle />
            <form 
                onSubmit={(e) => e.preventDefault()}
                className={`${inputFocus && on ? 'shadow-md' : ''} relative py-13r gap-18r px-15r flex items-center border-1 justify-start h-46r w-533r bg-[#F1F1F1] dark:bg-c-grey-70 dark:border-[#636363] rounded`}
            >
                <SearchIcon
                    className="left-0 w-19r h-19r dark:text-c-grey-40"
                    onClick={() => {
                        trackEvent('click_검색바');
                        handleFocus();
                    }}
                    alt="search"
                />
                <input
                    ref={inputRef}
                    onFocus={()=>{
                        trackEvent('click_검색바');
                        handleFocus();
                    }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchWord(e.target.value)}
                    className="dark:bg-c-grey-70 outline-none font-semibold dark:text-title-2 text-[#444444] w-full h-full bg-[#F1F1F1] rounded"
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