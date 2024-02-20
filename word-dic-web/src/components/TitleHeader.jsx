const TitleHeader = ({word}) => {

    return (
        <header className="flex items-center justify-center w-full">
            <div className="flex flex-col items-start justify-center w-full gap-21r h-110r">
                <hr className="w-full h-1r bg-[#E5E5E5]"/>
                <h1 className="font-bold ml-37r headline-1">{word}</h1>
                <hr className="w-full h-1r bg-[#E5E5E5]"/>
            </div>
        </header>
    )
}

export default TitleHeader;