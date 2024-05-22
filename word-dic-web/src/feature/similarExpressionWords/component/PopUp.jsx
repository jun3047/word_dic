import React, { useCallback } from "react";
import useTrackEvent from 'feature/logging/useTrackEvent';

const PopUp = ({ on, alignType, setAlignType }) => {

    useTrackEvent(`click_분류-${alignType}`);

    const handleAlignClick = useCallback((text) => {
        setAlignType(text);
    }, [setAlignType]);

    return (
        <dialog className={`absolute flex flex-col m-0 bg-white rounded-md shadow-md top-50r right-0r w-105r py-10r ${on ? '' : 'hidden'}`}>
            {['글자순', '친숙성', '강도'].map((text, i) => {
                const isalignType = text === alignType;
                console.log(text, alignType);
                return (
                    <button
                        key={i}
                        onClick={() => handleAlignClick(text)}
                        className={`relative flex items-center justify-center w-full h-30r caption-1 ${isalignType ? 'text-[#444444] bg-[#E9E9E9]' : 'text-[#ABABAB]'} hover:text-[#444444] hover:bg-[#E9E9E9]`}
                    >
                        <img
                            src="./svg/checkIcon.svg"
                            alt="체크"
                            className={`absolute top-8r left-15r ${isalignType ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {text}
                    </button>
                );
            })}
        </dialog>
    );
};

export default PopUp;