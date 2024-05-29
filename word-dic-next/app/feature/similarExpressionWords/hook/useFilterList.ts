import { useState } from 'react';

const useFilterList = (initialValue: string[]) => {
    const [filterList, setFilterList] = useState(initialValue);

    const modifyFilterList = (text: string) => {
        setFilterList(prev => {
            return prev.includes(text)
                ? prev.filter(filter => filter !== text)
                : [...prev, text];
        });
    };

    return [filterList, modifyFilterList] as const;
};

export default useFilterList;