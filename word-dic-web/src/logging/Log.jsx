import { useEffect } from 'react';
import { trackEvent } from './amplitude';

const useTrackEvent = (eventName, dep = [], cond = true) => {
    useEffect(() => {
        if (cond) {
            trackEvent(eventName);
        }
    }, dep);
};

const TrackButton = ({ eventName, onClick, children, ...props }) => {
    const handleClick = (e) => {
        trackEvent(eventName);
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

export {useTrackEvent, TrackButton};
