import WordBox from "feature/common/component/WordBox"
import { EXAMPLE_SETENCE_SIZE } from "data/constant";

const ExampleSection = ({mean, paginatedList, 소속, page}) => {
    return (
        <section className="flex flex-col justify-start w-full px-8r">
            {mean && (
                <p className="body-text text-[#636363] py-10r w-full flex items-start">
                    <span className="font-semibold mt-0 text-[#434343] mr-4r">[뜻]</span>
                    {mean}
                </p>
            )}
            {paginatedList.map((text, i) => (
                <p key={i} className="body-text text-[#636363] py-10r w-full flex items-start">
                    <span className="font-semibold text-[#434343] w-40r">{i + 1 + (page - 1) * EXAMPLE_SETENCE_SIZE}.</span>
                    <p className="flex flex-wrap">
                        <NotWordBox texts={text[0]} />
                        <WordBox active={true} word={text[1]} 소속={소속} />
                        <NotWordBox texts={text[2]} />
                    </p>
                </p>
            )
            )}
        </section>
    )
}

const NotWordBox = ({texts}) => {
    return texts && texts.split(' ').map((text, i) => <span key={i} className="m-3r">{text}</span>)
}

export default ExampleSection;