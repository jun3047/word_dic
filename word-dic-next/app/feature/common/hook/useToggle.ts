import { useState } from "react";

const useToggle = (initialValue = false) => {

    const [state, setState] = useState<boolean>(initialValue);
    const toggle = () => setState(prevState => !prevState);

    return [state, toggle] as const;
}

export default useToggle;