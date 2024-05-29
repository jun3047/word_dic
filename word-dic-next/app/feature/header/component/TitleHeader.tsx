const TitleHeader = ({ word }: { word: string }) => {

    return (
        <header className="flex items-center justify-center w-full">
            <section className="flex flex-col items-start justify-center w-full gap-21r h-110r">
                <hr className="border-0 w-full h-1r bg-[#E5E5E5] dark:bg-c-grey-60" />
                <h1 className="font-bold ml-37r headline-1 dark:text-title-1">{word}</h1>
                <hr className="border-0 w-full h-1r bg-[#E5E5E5] dark:bg-c-grey-60" />
            </section>  
        </header>
    )
}

export default TitleHeader;