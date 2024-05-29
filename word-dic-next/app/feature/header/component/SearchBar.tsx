import React, { memo, useMemo, useState } from 'react';
import { trackEvent } from '@/app/feature/logging/amplitude';
import useTrackEvent from '@/app/feature/logging/useTrackEvent';
import 연관검색어 from './연관검색어';
import useActiveWord from '@/app/feature/header/hook/useActiveWord';
import useInputFocus from '@/app/feature/header/hook/useInputFocus';
import useSearchKeyPressHandler from '../hook/useSearchKeyPressHandler';
import DarkModeToggle from '@/app/feature/header/component/darkModeToggle';
import SearchIcon from "@/public/svg/searchIcon.svg";
import getRelatedWord from '@/app/utils/getRelatedWord';

const SearchBar = ({ search }: {
    search: (searchWord: string) => void
}) => {

    const [searchWord, setSearchWord] = useState<string>('');
    const relatedKeywords = useMemo(() => searchWord ? getRelatedWord(searchWord) : [], [searchWord]);

    const [activeWord, setActiveWord] = useActiveWord(relatedKeywords);
    const [inputFocus, handleFocus, handleBlur] = useInputFocus(false);

    const on = relatedKeywords.length > 0;


    const [inputRef, handleKeyPress] = useSearchKeyPressHandler(
        relatedKeywords,
        activeWord,
        setActiveWord,
        setSearchWord,
        search,
    );

    const noSearchWord = searchWord ? searchWord.length === 0 : true;

    useTrackEvent(
        `view_연관검색어-${searchWord}`,
        [inputFocus, on, searchWord],
        inputFocus && on && noSearchWord
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
                    onFocus={() => {
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

export default memo(SearchBar);