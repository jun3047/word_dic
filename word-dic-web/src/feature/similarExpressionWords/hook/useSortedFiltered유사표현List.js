import { useMemo } from "react";

const useSortedFiltered유사표현List = (alignType, filterList, 유사표현List) => {
    return useMemo(() => {
        return 유사표현List
        .filter(word => filterList.includes(word.type) && (filterList.includes('제외필터') ? word['친숙성'] > 400 : true))
        .sort((a, b) => alignType === '글자순' ? a.text.localeCompare(b.text, 'ko') : b[alignType] - a[alignType]);
    }, [alignType, filterList, 유사표현List]);
};

export default useSortedFiltered유사표현List;