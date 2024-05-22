import React from 'react';
import WordBox from 'feature/common/component/WordBox';

const WordList = ({ word, setWord, paginatedList }) => {
    return (
        <section className="flex flex-wrap w-full my-18r mx-48r gap-8r">
            {paginatedList.map((_word, i) => (
                <WordBox
                    setWord={setWord}
                    active={word === _word.text}
                    key={i}
                    word={_word.text}
                    소속={_word['소속']}
                />
            ))}
        </section>
    );
};

export default WordList;