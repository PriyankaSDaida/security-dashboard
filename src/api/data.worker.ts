/* eslint-disable no-restricted-globals */
import { Vulnerability } from './types';

// Web Worker to handle large data fetching and parsing
self.onmessage = async (e: MessageEvent) => {
    const { type, url } = e.data;

    if (type === 'FETCH_DATA') {
        try {
            // In a real scenario, we might use a streaming parser here (e.g., oboe.js)
            // For this demo, we use standard fetch but off-main-thread
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const json = await response.json();

            // Assume the JSON structure is a list or has a property 'vulnerabilities'
            // Adjust based on actual JSON structure. 
            // Based on provided URL, it seems to be a list or object.
            // If it's the chandusc/Ui-Demo-Data format, we'd inspect it.

            // Post back chunks or full data
            self.postMessage({ type: 'SUCCESS', data: json });
        } catch (error) {
            self.postMessage({ type: 'ERROR', error: (error as Error).message });
        }
    }
};

export { };
