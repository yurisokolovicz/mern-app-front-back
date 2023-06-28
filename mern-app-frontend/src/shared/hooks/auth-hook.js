import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    // useCallback will make sure that this function is not recreated when the component re-renders. To avoid infinite loop.
    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        // creating a time 1h in the future to set token expiration in localStorage
        const tokenExpDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1000 milisecons, *60 * 60 = 1h
        setTokenExpirationDate(tokenExpDate);
        // using JSON stringify to convert object into string in the localstorage.
        localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpDate.toISOString() }));
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]); // logout is usingCallback to avoid infinite loop

    // In useEffect if dependencies is an empty array, the function will only run once. When the component mounts (render for the 1st time)
    useEffect(() => {
        // parse method convert JSON strings back to regular javascript data structures like objects (userId and token)
        const storedData = JSON.parse(localStorage.getItem('userData'));
        // If we have storedData and if we have token in the storedData we want to login and forward userId and token.
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout, userId };
};
