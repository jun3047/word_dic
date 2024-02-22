import 연관검색어 from './연관검색어';

const SearchBar = ({relatedKeywords, setSearchWord, on, searchWord, search}) => {

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') search(relatedKeywords[0])
    }

    return (
        <header className="flex items-center justify-center w-full h-83r">
            <div className={`${on && 'shadow-md'} relative py-13r gap-18r px-15r flex items-center justify-start h-46r w-533r bg-[#F1F1F1] rounded`}>
                <img onClick={()=>{}} className="left-0 w-19r h-19r" src="/svg/searchIcon.svg" alt="search"/>
                <input onKeyDown={handleKeyPress} onChange={(e)=>setSearchWord(e.target.value)} className="outline-none font-semibold text-[#444444] w-full h-full bg-inherit" type="text" placeholder="검색할 단어를 적어주세요" />
                <연관검색어
                    searchWord={searchWord}
                    search={search}
                    relatedKeywords={relatedKeywords}
                    on={on}
                />
            </div>
        </header>
    )
}

export default SearchBar;