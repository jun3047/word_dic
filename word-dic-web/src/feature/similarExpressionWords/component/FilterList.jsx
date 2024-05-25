import React from 'react';
import { FILTER_LIST } from 'data/constant';

const FilterList = ({ filterList, modifyFilterList }) => {
    return (
        <fieldset className="flex items-start w-full gap-24r my-17r px-14r">
            {FILTER_LIST.map((text, i) => (
                <FilterSelect
                    key={i}
                    text={text}
                    onChange={modifyFilterList}
                    checked={filterList.includes(text)}
                />
            ))}
        </fieldset>
    );
};

const FilterSelect = ({ text, checked, onChange }) => {
    return (
        <label htmlFor={text} className="font-bold subTitle-1 dark:text-title-2 text-[#ABABAB] hover:cursor-pointer">
            <input
                onChange={()=>onChange(text)}
                checked={checked}
                style={{ accentColor: 'black' }}
                className="mr-7r h-16r w-16r hover:cursor-pointer"
                type="checkbox"
                id={text}
                name="filter"
                value={text}
            />
            {text}
        </label>
    );
}

export default FilterList;