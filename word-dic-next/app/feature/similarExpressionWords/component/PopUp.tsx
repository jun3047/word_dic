import React, { useCallback } from "react";
import useTrackEvent from '@/app/feature/logging/useTrackEvent';
import CheckIcon from "@/public/svg/checkIcon.svg";

interface PopUpProps {
    on: boolean;
    alignType: string;
    setAlignType: (alignType: AlignType) => void;
}

const PopUp = ({ on, alignType, setAlignType }: PopUpProps) => {
    useTrackEvent(`click_분류-${alignType}`);

    const handleAlignClick = useCallback((text: AlignType) => {
        setAlignType(text);
    }, [setAlignType]);

    const AlignList: AlignType[] = ['글자순', '친숙성', '강도'];

    return (
        <div className={`absolute flex flex-col m-0 bg-white dark:bg-c-grey-70 rounded-md shadow-md top-50r right-0r w-105r py-10r ${on ? '' : 'hidden'}`}>
            {AlignList.map((text, i) => {
                const isalignType = text === alignType;
                return (
                    <div
                        key={i}
                        onClick={() => handleAlignClick(text)}
                        className={`relative flex dark:text-title-1 items-center justify-center w-full h-30r caption-1 
                                    ${isalignType ? 'text-[#444444] bg-[#E9E9E9] dark:text-title-1 dark:bg-c-grey-60' : 'text-[#ABABAB] dark:text-title-1'}
                                    hover:text-[#444444] hover:bg-[#E9E9E9]
                                    dark:hover:text-title-1 dark:hover:bg-c-grey-60
                                `}
                    >
                        <CheckIcon
                            className={`absolute top-8r dark:text-title-1 left-15r ${isalignType ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {text}
                    </div>
                );
            })}
        </div>
    );
};

export default PopUp;