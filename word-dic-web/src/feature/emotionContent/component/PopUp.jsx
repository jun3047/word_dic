import React, { useEffect, useCallback } from "react";
import useTrackEvent from '../../logging/useTrackEvent';

const PopUp = ({ on, nowAlign, setNowAlign }) => {

    useTrackEvent(`click_분류-${nowAlign}`);

    const handleAlignClick = useCallback((text) => {
        setNowAlign(text);
    }, [setNowAlign]);

    return (
        <dialog className={`absolute flex flex-col m-0 bg-white rounded-md shadow-md top-50r right-0r w-105r py-10r ${on ? '' : 'hidden'}`}>
            {['글자순', '친숙성', '강도'].map((text, i) => {
                const isNowAlign = text === nowAlign;
                return (
                    <button
                        key={i}
                        onClick={() => handleAlignClick(text)}
                        className={`relative flex items-center justify-center w-full h-30r caption-1 ${isNowAlign ? 'text-[#444444] bg-[#E9E9E9]' : 'text-[#ABABAB]'} hover:text-[#444444] hover:bg-[#E9E9E9]`}
                    >
                        <img
                            src="./svg/checkIcon.svg"
                            alt="체크"
                            className={`absolute top-8r left-15r ${isNowAlign ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {text}
                    </button>
                );
            })}
        </dialog>
    );
};

export default PopUp;