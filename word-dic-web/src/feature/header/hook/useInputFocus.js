import { useState, useCallback } from 'react';

const useInputFocus = () => {
    const [inputFocus, setInputFocus] = useState(false);
    
    const handleFocus = useCallback(() => {
        setInputFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
        setInputFocus(false);
    }, []);

    return [inputFocus, handleFocus, handleBlur];
};

export default useInputFocus;