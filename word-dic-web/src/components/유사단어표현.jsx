import PagiNation from "./PagiNation"
import WordBox from "./WordBox"
import PopUp from './PopUp';
import { useEffect, useState } from "react";

const 유사단어표현 = (
    {
        onPopup,
        changePopup,
        nowFilterList,
        modifyFilterList,
        nowAlign,
        setNowAlign,
        유사표현List
    }) => {

    const sortKoreanWordsList = (words) => {
        return words.sort((a, b) => a.text.localeCompare(b.text, 'ko'));
    }

    const aligned유사표현List = (alignType, _유사표현List) => {
        if(alignType === '글자순') return sortKoreanWordsList(_유사표현List)
        return 유사표현List.sort((a, b) => a[alignType] - b[alignType])
    }

    const filtered유사표현List = (filterList, _유사표현List) => {
        return _유사표현List.filter((word) => filterList.includes(word.type))
    }

    const sorted유사표현 = (alignType, filterList, _유사표현List) => {

        const _aligned유사표현List = aligned유사표현List(alignType, _유사표현List)
        const _filtered유사표현List = filtered유사표현List(filterList, _aligned유사표현List)

        return _filtered유사표현List
    }

    const [_유사표현List, _set유사표현List] = useState(sorted유사표현(nowAlign, nowFilterList, 유사표현List))

    useEffect(()=>{
        _set유사표현List(sorted유사표현(nowAlign, nowFilterList, 유사표현List))
    },[nowAlign, nowFilterList])

    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold ml-37r headline-2">유사단어 표현</h2>
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
                    ['기본표현', '행동표현', '신체감각', '제외필터'].map((text, i) => 
                            <FilterSelect onChange={(text)=> modifyFilterList(text)} checked={nowFilterList.includes(text)} key={i} text={text} />
                    )
                }
            </fieldset>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
                {
                    _유사표현List.map((word, i) =>
                        <WordBox key={i} word={word.text} color={'yellow'} />
                    )
                }   
            </section>
            <PagiNation
                lastNum={4}
                nowPageNum={4}
                setNowPageNum={() => {}}
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