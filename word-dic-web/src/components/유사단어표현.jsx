import PagiNation from "./PagiNation"
import WordBox from "./WordBox"
import PopUp from './PopUp';

const 유사단어표현 = () => {

    const popup = false;

    return (
        <main className="relative flex flex-col items-center justify-center w-full h-full px-40r">
            <header className="flex items-center justify-between w-full py-11r h-76r">
                <h2 className="font-bold ml-37r headline-2">유사단어 표현</h2>
                <div className={`flex items-center justify-center w-40r h-40r rounded-full ${popup && 'bg-[#F1F1F1]'}`}>
                    <img className="w-20r h-17r" src="/svg/alignIcon.svg" alt="alignIcon"/>
                </div>
                <PopUp on={popup}/>
            </header>
            <hr className="w-full h-1r bg-[#E5E5E5]"/>
            <fieldset className="flex items-start w-full gap-24r my-17r px-14r">
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

export default 유사단어표현;