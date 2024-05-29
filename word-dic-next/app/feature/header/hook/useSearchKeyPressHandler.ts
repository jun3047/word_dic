import { trackEvent } from "@/app/feature/logging/amplitude";
import { useRef, MutableRefObject } from "react";

type SearchFunction = (word: string) => void;
type SetFunction = (word: string) => void;

const useSearchKeyPressHandler = (
    relatedKeywords: string[],
    activeWord: string,
    setActiveWord: SetFunction,
    setSearchWord: SetFunction,
    search: SearchFunction
): [MutableRefObject<HTMLInputElement | null>, (e: React.KeyboardEvent<HTMLInputElement>) => void] => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const NO_KEYWORDS = relatedKeywords.length === 0;
    const nowWordIndex = NO_KEYWORDS ? -1 : relatedKeywords.indexOf(activeWord);

    const getNextIndex = (currentIndex: number, offset: number): number => {
        if (NO_KEYWORDS) return -1;
        return (currentIndex + offset + relatedKeywords.length) % relatedKeywords.length;
    };

    const pressEnter = () => {
        if (NO_KEYWORDS) return;
        const nextSearchWord = relatedKeywords[nowWordIndex];
        setSearchWord(nextSearchWord);
        search(nextSearchWord);
        trackEvent(`type_검색-${nextSearchWord}`);
    };

    const pressUp = () => {
        if (NO_KEYWORDS) return;
        const upWordIndex = getNextIndex(nowWordIndex, -1);
        setActiveWord(relatedKeywords[upWordIndex]);
        trackEvent('type_연관검색어-위이동');
    };

    const pressDown = () => {
        if (NO_KEYWORDS) return;
        const downWordIndex = getNextIndex(nowWordIndex, 1);
        setActiveWord(relatedKeywords[downWordIndex]);
        trackEvent('type_연관검색어-아래이동');
    };

    const handleKeyPress = useInputKeyHandler({
        enterAction: pressEnter,
        upAction: pressUp,
        downAction: pressDown,
        inputRef: inputRef,
        ignoreCond: NO_KEYWORDS,
    });

    return [inputRef, handleKeyPress];
};

interface InputKeyHandlerProps {
    enterAction: () => void;
    upAction: () => void;
    downAction: () => void;
    ignoreCond: boolean;
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

const useInputKeyHandler = ({ enterAction, upAction, downAction, ignoreCond, inputRef }: InputKeyHandlerProps) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (ignoreCond) return;

        switch (e.key) {
            case 'Enter':
                if (inputRef.current) {
                    inputRef.current.blur();
                }
                enterAction();
                break;
            case 'ArrowDown':
                downAction();
                break;
            case 'ArrowUp':
                upAction();
                break;
            default:
                break;
        }
    };

    return handleKeyPress;
};

export default useSearchKeyPressHandler;