import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PagiNation from "./PagiNation";
import WordBox from "./WordBox";
import PopUp from './PopUp';
import { useTrackEvent } from '../logging/Log';

const PAGE_SIZE = 20;

const 유사표현단어 = ({
    word,
    setWord,
    onPopup,
    changePopup,
    nowFilterList,
    modifyFilterList,
    nowAlign,
    setNowAlign,
    유사표현List,
}) => {
    const [page, setPage] = useState(1);
    
    const sorted유사표현List = useMemo(() => {
        return getSortedFiltered유사표현List(nowAlign, nowFilterList, 유사표현List);
    }, [nowAlign, nowFilterList, 유사표현List]);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return sorted유사표현List.slice(start, start + PAGE_SIZE);
    }, [sorted유사표현List, page]);

    const handleWordBoxClick = useCallback((text) => {
        setWord(text);
    }, [setWord]);

    useTrackEvent(`click_필터-${nowFilterList}`, [nowFilterList])

    useEffect(() => {
        setPage(1);
    }, [nowAlign, nowFilterList, 유사표현List]);

    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold headline-2">유사단어 표현</h2>
                <div onClick={changePopup} className={`flex relative items-center justify-center w-40r h-40r rounded-full ${onPopup ? 'bg-[#F1F1F1]' : ''}`}>
                    <button>
                        <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon" />
                    </button>
                    <PopUp
                        nowAlign={nowAlign}
                        setNowAlign={setNowAlign}
                        on={onPopup}
                    />
                </div>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]" />
            <fieldset className="flex items-start w-full gap-24r my-17r px-14r">
                {
                    ['기본표현', '행동표현', '신체감각', '제외필터'].map((text, i) =>
                        <FilterSelect onChange={modifyFilterList} checked={nowFilterList.includes(text)} key={i} text={text} />
                    )
                }
            </fieldset>
            <hr className="w-full h-1r bg-[#E5E5E5]" />
            <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
                {
                    paginatedList.map((_word, i) =>
                        <WordBox
                            setWord={handleWordBoxClick}
                            active={word === _word.text}
                            key={i}
                            word={_word.text}
                            소속={_word['소속']}
                        />
                    )
                }
            </section>
            <PagiNation
                lastNum={Math.ceil(sorted유사표현List.length / PAGE_SIZE)}
                nowPageNum={page}
                setNowPageNum={setPage}
            />
        </main>
    );
}

const FilterSelect = ({ text, checked, onChange }) => {
    return (
        <label htmlFor={text} className="font-bold subTitle-1 text-[#ABABAB] hover:cursor-pointer">
            <input
                onChange={() => onChange(text)}
                checked={checked}
                style={{ accentColor: 'black' }}
                className="mr-7r h-16r w-16r hover:cursor-pointer"
                type="checkbox"
                id={text}
                name="filter"
                value={text}
            />
            {text}
        </label>
    );
}

export default 유사표현단어;


const sortKoreanWordsList = (words) => words.sort((a, b) => a.text.localeCompare(b.text, 'ko'));

const aligned유사표현List = (alignType, words) => {
    if (alignType === '글자순') return sortKoreanWordsList(words);
    return words.sort((a, b) => b[alignType] - a[alignType]);
};

const filtered유사표현List = (filterList, words) => {
    const filteredList = words.filter((word) => filterList.includes(word.type));
    return filterList.includes('제외필터') ? filteredList.filter((word) => word['친숙성'] > 400) : filteredList;
};

const getSortedFiltered유사표현List = (alignType, filterList, 유사표현List) => {
    const alignedList = aligned유사표현List(alignType, 유사표현List);
    return filtered유사표현List(filterList, alignedList);
};