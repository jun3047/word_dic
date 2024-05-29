import { useState, useCallback } from 'react';

const useInputFocus = (initialValue = false) => {
    const [inputFocus, setInputFocus] = useState(initialValue);

    const handleFocus = useCallback(() => {
        setInputFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
        setInputFocus(false);
    }, []);

    return [inputFocus, handleFocus, handleBlur] as const;
};

export default useInputFocus;