/* eslint-disable no-restricted-globals */
import { Vulnerability } from './types';
import realData from './realData_sample.json';

// Web Worker to handle large data fetching and parsing
self.onmessage = async (e: MessageEvent) => {
    const { type } = e.data;

    if (type === 'FETCH_DATA') {
        try {
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 800));

            // Return the real sampled data
            self.postMessage({ type: 'SUCCESS', data: realData });
        } catch (error) {
            self.postMessage({ type: 'ERROR', error: (error as Error).message });
        }
    }
};

export { };
