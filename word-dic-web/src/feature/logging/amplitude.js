import amplitude from 'amplitude-js';
import memoize from 'lodash/memoize';

const init = memoize(() => {
    const apiKey = process.env.REACT_APP_AMPLITUDE_API_KEY;

    amplitude.getInstance().init(apiKey, undefined, {
        includeReferrer: true,
        disableCookies: true,
    })
})

export const trackEvent = (eventName, data) => {
    if(process.env.NODE_ENV !== 'production') return;

    init();

    amplitude.getInstance().logEvent(eventName, data);
}