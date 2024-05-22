import { trackEvent } from "feature/logging/amplitude";
import { useRef } from "react";

const useSearchKeyPressHandler = (relatedKeywords, activeWord, setActiveWord, setSearchWord, search) => {

    const inputRef = useRef(null);

    const NO_KEYWORDS = relatedKeywords.length === 0;
    const nowWordIndex = NO_KEYWORDS ? -1 : relatedKeywords.indexOf(activeWord);

    const getNextIndex = (currentIndex, offset) => {
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

    return [inputRef, handleKeyPress]
};

const useInputKeyHandler = ({ enterAction, upAction, downAction, ignoreCond, inputRef }) => {

    const handleKeyPress = (e) => {
        if (ignoreCond) return;

        switch (e.key) {
            case 'Enter':
                inputRef.current.blur();
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