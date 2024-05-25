import React, { useState } from 'react';
import PagiNation from "feature/common/component/PagiNation";
import useTrackEvent from 'feature/logging/useTrackEvent'
import { WORO_BOX_SIZE, FILTER_LIST } from 'data/constant';
import useWordPagination from 'feature/similarExpressionWords/hook/useWordPagination';
import useSortedFiltered유사표현List from 'feature/similarExpressionWords/hook/useSortedFiltered유사표현List';
import useFilterList from '../hook/useFilterList';
import FilterHeader from './FilterHeader';
import FilterList from './FilterList';
import WordList from './WordList';

const 유사표현단어 = ({
    word,
    setWord,
    유사표현List,
}) => {

    const [alignType, setAlignType] = useState('친숙성');
    const [filterList, modifyFilterList] = useFilterList([FILTER_LIST[0]]);
    const sorted유사표현List = useSortedFiltered유사표현List(alignType, filterList, 유사표현List);
    const {page, setPage, paginatedList} = useWordPagination(sorted유사표현List)

    useTrackEvent(`click_필터-${filterList}`, [filterList])

    return (
        <main className="flex flex-col items-center justify-start w-full h-full px-40r">
            <FilterHeader
                alignType={alignType}
                setAlignType={setAlignType}
            />
            <hr className="w-full h-1r bg-[#E5E5E5] border-0 dark:bg-c-grey-60" />
            <FilterList 
                filterList={filterList}
                modifyFilterList={modifyFilterList}
            />
            <hr className="w-full h-1r bg-[#E5E5E5] border-0 dark:bg-c-grey-60" />
            <WordList
                word={word}
                setWord={setWord}
                paginatedList={paginatedList}
            />
            <PagiNation
                lastNum={Math.ceil(sorted유사표현List.length / WORO_BOX_SIZE)}
                nowPageNum={page}
                setNowPageNum={setPage}
            />
        </main>
    );
}

export default 유사표현단어;

