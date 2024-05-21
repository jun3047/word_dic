import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PagiNation from "./PagiNation";
import WordBox from "./WordBox";
import PopUp from './PopUp';
import TrackButton from 'feature/logging/TrackButton'
import useTrackEvent from 'feature/logging/useTrackEvent'
import { getSortedFiltered유사표현List } from 'util/getSortedFiltered유사표현List';


const PAGE_SIZE = 20;
const FILTER_LIST = ['기본표현', '행동표현', '신체감각', '제외필터'];

const 유사표현단어 = ({
    word,
    setWord,
    유사표현List,
}) => {
    const [page, setPage] = useState(1);
    const [nowAlign, setNowAlign] = useState('친숙성');
    const [nowFilterList, setNowFilterList] = useState(['기본표현']);
    const [onPopup, setOnPopup] = useState(false);

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

    const modifyFilterList = (text) => {
        setNowFilterList(prev => prev.includes(text) ? prev.filter((filter) => filter !== text) : [...prev, text]);
    };

    const changePopupHandler = () => {
        setOnPopup(prev => !prev);
    };

    useTrackEvent(`click_필터-${nowFilterList}`, [nowFilterList])

    useEffect(() => {
        setPage(1);
    }, [nowAlign, nowFilterList, 유사표현List]);

    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold headline-2">유사단어 표현</h2>
                <TrackButton 
                    eventName={`click_분류-${!onPopup ? 'ON' : 'OFF'}`}
                    onClick={changePopupHandler}
                    className={`flex relative items-center justify-center w-40r h-40r rounded-full ${onPopup ? 'bg-[#F1F1F1]' : ''}`}
                >
                    <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon" />
                    <PopUp
                        nowAlign={nowAlign}
                        setNowAlign={setNowAlign}
                        on={onPopup}
                    />
                </TrackButton>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]" />
            <fieldset className="flex items-start w-full gap-24r my-17r px-14r">
                {FILTER_LIST.map((text, i) =>
                    <FilterSelect 
                        key={i}
                        text={text}
                        onChange={modifyFilterList}
                        checked={nowFilterList.includes(text)}
                    />
                )}
            </fieldset>
            <hr className="w-full h-1r bg-[#E5E5E5]" />
            <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
                {paginatedList.map((_word, i) =>
                    <WordBox
                        setWord={handleWordBoxClick}
                        active={word === _word.text}
                        key={i}
                        word={_word.text}
                        소속={_word['소속']}
                    />
                )}
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