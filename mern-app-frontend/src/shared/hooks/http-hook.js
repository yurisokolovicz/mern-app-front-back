import { useState, useCallback } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // Reusable function - we forward all the parametters (url, method, etc) to fetch
    // To avoid infinite loop of sendRequest we wrap it with the useCallback hook. So this function never gets recreated when the component that uses this hook re-render.
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            // Extract response data
            const responseData = await response.json();
            // Throw error if we have 400 or 500 response code. IF IT IS NOT 200
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            // Success case, if we pass the if check
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    // return { isLoading: isLoading, error: error, sendRequest: sendRequest };
    return { isLoading, error, sendRequest, clearError };
};
