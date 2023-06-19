import { useState, useCallback } from 'react';
// import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // const activeHttpRequest = useRef([]);

    // Reusable function - we forward all the parametters (url, method, etc) to fetch
    // To avoid infinite loop of sendRequest we wrap it with the useCallback hook. So this function never gets recreated when the component that uses this hook re-render.
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        // const httpAbortCtrl = new AbortController();
        // activeHttpRequest.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers
                // signal: httpAbortCtrl.signal
            });
            // Extract response data
            const responseData = await response.json();
            // Throw error if we have 400 or 500 response code. IF IT IS NOT 200
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            // Success case, if we pass the if check
            return responseData;
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const clearError = () => {
        setError(null);
    };

    // useEffect(() => {
    //     return () => {
    //         activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
    //     };
    // }, []);

    // return { isLoading: isLoading, error: error, sendRequest: sendRequest };
    return { isLoading, error, sendRequest, clearError };
};
