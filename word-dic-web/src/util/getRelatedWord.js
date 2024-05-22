import 기본표현 from 'data/기본표현.json';

const getRelatedWord = (word) => {
    let relatedWords = [];
    for (const key in 기본표현) {
      const list = 기본표현[key];
      const found = list.filter(item => item.text.includes(word));
      if (found.length > 0) {
        relatedWords = relatedWords.concat(found.map(item => item.text));
      }
    }
    return [...new Set(relatedWords)].slice(0, 5);
};

export default getRelatedWord;