import { useEffect } from 'react';
import { trackEvent } from './amplitude';

const useTrackEvent = (eventName, dep = [], cond = true) => {
    useEffect(() => {
        if (cond) {
            trackEvent(eventName);
        }
    }, dep);
};

export default useTrackEvent;