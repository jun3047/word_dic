import { trackEvent } from '../logging/amplitude';
import 연관검색어 from './연관검색어';
import { useState, useEffect, useRef } from 'react';

const SearchBar = ({relatedKeywords, setSearchWord, searchWord, on, search}) => {

    const [activeWord, setActiveWord] = useState(relatedKeywords[0])
    const inputRef = useRef(null);

    const handleKeyPress = (e) => {

        if(relatedKeywords.length === 0) return
        const nowWordIndex = relatedKeywords.indexOf(activeWord)

        const downWordIndex = nowWordIndex + 1 === relatedKeywords.length ? 0 : nowWordIndex + 1
        const upWordIndex = nowWordIndex - 1

        if(e.key === 'Enter') {
            inputRef.current.blur();
            inputRef.current.value = relatedKeywords[nowWordIndex]

            const nextSearchWord = relatedKeywords[nowWordIndex]
            search(nextSearchWord)
            trackEvent(`type_검색-${nextSearchWord}`)
        }
        else if(e.key === 'ArrowDown') {
            setActiveWord(relatedKeywords.at(downWordIndex))
            trackEvent(`type_연관검색어-아래이동`)
        }
        else if(e.key === 'ArrowUp') {
            setActiveWord(relatedKeywords.at(upWordIndex))
            trackEvent(`type_연관검색어-위이동`)
        }
    }

    useEffect(()=>{
        setActiveWord(relatedKeywords[0])
    },[relatedKeywords])

    const [inputFocus, setInputFocus] = useState(false)

    const handleFocus = () => {setInputFocus(true); trackEvent('click_검색바');}
    const handleBlur = () => setInputFocus(false)

    useEffect(()=>{

        if(!(inputFocus && on)) return
        
        trackEvent(`view_연관검색어-${searchWord}`);
    },[inputFocus, on])

    return (
        <header className="flex items-center justify-center w-full h-83r">
            <div className={`${(inputFocus && on) && 'shadow-md'} relative py-13r gap-18r px-15r flex items-center justify-start h-46r w-533r bg-[#F1F1F1] rounded`}>
                <img onClick={()=>{}} className="left-0 w-19r h-19r" src="/svg/searchIcon.svg" alt="search"/>
                <input ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyPress} onChange={(e)=>setSearchWord(e.target.value)} className="outline-none font-semibold text-[#444444] w-full h-full bg-inherit" type="text" placeholder="검색할 단어를 적어주세요" />
                <연관검색어
                    activeWord={activeWord}
                    search={search}
                    relatedKeywords={relatedKeywords}
                    on={inputFocus && on}
                />
            </div>
        </header>
    )
}

export default SearchBar;