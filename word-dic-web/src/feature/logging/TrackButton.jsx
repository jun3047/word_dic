import { trackEvent } from './amplitude';

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

export default TrackButton;