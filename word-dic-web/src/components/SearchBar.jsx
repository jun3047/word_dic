const SearchBar = ({setSearchWord, search}) => {

    // 와 serach 함수를 받아야 함

    return (
        <header className="flex items-center justify-center w-full h-83r">
            <div className="py-13r gap-18r px-15r flex relative items-center justify-start h-46r w-533r bg-[#F1F1F1] rounded">
                <img onClick={search} className="left-0 w-19r h-19r" src="/svg/searchIcon.svg" alt="search"/>
                <input onChange={setSearchWord} className="outline-none font-semibold text-[#444444] w-full h-full bg-inherit" type="text" placeholder="검색할 단어를 적어주세요" />
            </div>
        </header>
    )
}

export default SearchBar;