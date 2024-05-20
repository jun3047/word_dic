export const getSortedFiltered유사표현List = (alignType, filterList, 유사표현List) => {
    const alignedList = aligned유사표현List(alignType, 유사표현List);
    return filtered유사표현List(filterList, alignedList);
};

const sortKoreanWordsList = (words) => words.sort((a, b) => a.text.localeCompare(b.text, 'ko'));

const aligned유사표현List = (alignType, words) => {
    if (alignType === '글자순') return sortKoreanWordsList(words);
    return words.sort((a, b) => b[alignType] - a[alignType]);
};

const filtered유사표현List = (filterList, words) => {
    const filteredList = words.filter((word) => filterList.includes(word.type));
    return filterList.includes('제외필터') ? filteredList.filter((word) => word['친숙성'] > 400) : filteredList;
};