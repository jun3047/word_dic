'use client'

import { trackEvent } from '@/app/feature/logging/amplitude';
import { ReactNode, MouseEventHandler } from 'react';

interface TrackButtonProps {
    eventName: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    [key: string]: any;
}

const TrackButton = ({ eventName, onClick, children, ...props }: TrackButtonProps) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
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