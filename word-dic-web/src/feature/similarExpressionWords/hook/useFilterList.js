import { useState } from 'react';

const useFilterList = (initialValue) => {
    const [filterList, setFilterList] = useState(initialValue);

    const modifyFilterList = (text) => {
        setFilterList(prev => {
            return prev.includes(text)
                ? prev.filter(filter => filter !== text)
                : [...prev, text];
        });
    };

    return [filterList, modifyFilterList];
};

export default useFilterList;