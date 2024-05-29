import { init as amplitudeInit, track as amplitudeTrack } from '@amplitude/analytics-browser';

const initMap = new Map<string, boolean>();

const initAmplitude = () => {
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!apiKey) {
        console.error('Amplitude API key is not defined');
        return;
    }

    if (!initMap.has(apiKey)) {
        amplitudeInit(apiKey);
        initMap.set(apiKey, true);
    }
};

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (process.env.NODE_ENV !== 'production') return;

    initAmplitude();
    amplitudeTrack(eventName, data);
};