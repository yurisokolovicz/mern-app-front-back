import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();
    // Every time the component render the fetch request is sent, the problem is that we also send this request everytime the component re-render (when we change something in the page), forming a infinite loop, then we need to use useEffect hook.
    useEffect(() => {
        // With fetch(), the default request type is a GET request.
        // We can use then() method or async await (I preffer this one)
        // We should NOT turn useEffect async, it CAN NOT return a promisse. We created another function (sendRequest) inside useEffect and turn it async
        const sendRequest = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('http://localhost:5000/api/users');

                const responseData = await response.json();
                // 400 or 500 status code
                if (!response) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    // reset error function
    const errorHandler = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />};
        </React.Fragment>
    );
};

export default Users;

// Props chain -> src/user/pages/Users.js -> src/user/components/UsersList.js -> src/user/components/UsersItem.js -> src/shared/UIElements/Avatar.js
