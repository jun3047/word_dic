const getRelatedWord = (word: string, 기본표현: Record<string, Expression[]>) => {
  let relatedWords: string[] = [];

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