import PagiNation from "./PagiNation"

const 유사단어표현 = () => {

    return (
        <main className="px-40r flex flex-col items-center justify-center w-[50%] h-[100%] min-w-600r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold ml-37r headline-2">유사단어 표현</h2>
                <div className="flex items-center justify-center w-40r h-40r bg-[#F1F1F1] rounded-full">
                    <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon"/>
                </div>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <fieldset className="flex gap-24r my-17r">
                {
                    ['기본표현', '행동표현', '신체감각', '제외필터'].map((text, i) => 
                            <FilterSelect key={i} text={text} />
                    )
                }
            </fieldset>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
                {
                    [
                        '단어', '다다다다다언',
                        '단어', '다다다언',
                        '단어', '다다다ddd다다언',
                        '단어', '다다다다언',
                    ].map((word, i) =>
                        <WordBox key={i} word={word} color={'yellow'} />
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

const FilterSelect = ({text, key}) => {
    return (
        <label htmlFor={key} className="font-bold subTitle-1 text-[#ABABAB]">
            <input style={{accentColor: 'black'}} className="mr-7r h-16r w-16r" type="checkbox" id={key} name="filter" value={key} />
            {text}
        </label>
    )
}

const WordBox = ({word, color}) => {

    let colorClass;
    switch(color) {
      case 'yellow':
        colorClass = `bg-yellow-main-color`;
        break;
      case 'blue':
        colorClass = `bg-blue-main-color`;
        break;
      // 다른 색상에 대한 case 추가해야함
      default:
        colorClass = ``;
    }
    
    return (
        <div class={`rounded-xl inline-flex items-center justify-center h-36r px-19r py-7r ${colorClass}`}>
            <p className={`body-text font-bold text-white`}>{word}</p>
        </div>
    )
}

export default 유사단어표현;