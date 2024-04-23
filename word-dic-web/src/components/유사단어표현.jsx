import PagiNation from "./PagiNation"
import WordBox from "./WordBox"
import PopUp from './PopUp';
import { useEffect, useState } from "react";
import { trackEvent } from "../logging/amplitude";


const PAGE_SIZE = 20; // 페이지당 표시할 항목의 수

const 유사단어표현 = (
    {
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

    const sortKoreanWordsList = (words) => {
        return words.sort((a, b) => a.text.localeCompare(b.text, 'ko'));
    }

    const aligned유사표현List = (alignType, _유사표현List) => {
        if(alignType === '글자순') return sortKoreanWordsList(_유사표현List)
        return _유사표현List.sort((a, b) => b[alignType] - a[alignType])
    }

    const filtered유사표현List = (filterList, _유사표현List) => {

        const __유사표현List = _유사표현List.filter((word) => filterList.includes(word.type))

        if(filterList.includes('제외필터')) return __유사표현List.filter((word) => word['친숙성'] > 400)
        else return __유사표현List
    }

    const sorted유사표현 = (alignType, filterList, _유사표현List) => {

        const _aligned유사표현List = aligned유사표현List(alignType, _유사표현List)
        const _filtered유사표현List = filtered유사표현List(filterList, _aligned유사표현List)

        return _filtered유사표현List
    }

    const [_유사표현List, _set유사표현List] = useState(sorted유사표현(nowAlign, nowFilterList, 유사표현List))


    useEffect(()=>{
        const _sorted유사표현 = sorted유사표현(nowAlign, nowFilterList, 유사표현List)
        _set유사표현List(_sorted유사표현)

        setPage(1);
        
    },[nowAlign, nowFilterList, 유사표현List, word])

    useEffect(()=>{
        trackEvent(`click_필터-${nowFilterList}`)
    },[nowFilterList])

    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [paginatedList, setPaginatedList] = useState([]); // 현재 페이지에 해당하는 리스트
  
    // 페이지 변경이나 유사표현List 변경 시 분할 리스트 업데이트
    useEffect(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      setPaginatedList(_유사표현List.slice(start, end));

    }, [_유사표현List, page]);

    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold headline-2">유사단어 표현</h2>
                <div onClick={changePopup} className={`flex relative items-center justify-center w-40r h-40r rounded-full ${onPopup && 'bg-[#F1F1F1]'}`}>
                    <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon"/>
                    <PopUp
                        nowAlign={nowAlign}
                        setNowAlign={setNowAlign}
                        on={onPopup}
                    />
                </div>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <fieldset className="flex items-start w-full gap-24r my-17r px-14r">
                {
                    // '행동표현', '신체감각'는 현재 제외
                    ['기본표현','제외필터'].map((text, i) => 
                            <FilterSelect onChange={(text)=> modifyFilterList(text)} checked={nowFilterList.includes(text)} key={i} text={text} />
                    )
                }
            </fieldset>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
                {
                    paginatedList.map((_word, i) =>
                        <WordBox 
                            setWord={(text)=>{
                                setWord(text);
                                trackEvent(`click_wordBox-${text}`)
                            }}
                            active={word === _word.text}
                            key={i}
                            word={_word.text}
                            소속={_word['소속']}
                        />
                    )
                }   
            </section>
            <PagiNation
                lastNum={Math.ceil(_유사표현List.length / PAGE_SIZE)}
                nowPageNum={page}
                setNowPageNum={setPage}
            />
        </main>
    )
}

const FilterSelect = ({text, key, checked, onChange}) => {

    return (
        <label htmlFor={key} className="font-bold subTitle-1 text-[#ABABAB]">
            <input onChange={()=>onChange(text)} checked={checked} style={{accentColor: 'black'}} className="mr-7r h-16r w-16r" type="checkbox" id={key} name="filter" value={key} />
            {text}
        </label>
    )
}

export default 유사단어표현;