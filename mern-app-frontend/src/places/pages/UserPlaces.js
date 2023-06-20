import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    // useEffect to send the http request when the component render, but not when it re-render.
    // The sendRequest will never be recreated because it is wrapped in useCallback, so it will never trigger the useEffect function to re-render. The function will only render once when the component is mounted.
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                // GET is the default
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
        </React.Fragment>
    );
};
export default UserPlaces;

// useParam() hook is used to extract dynamic segments from the URL. in ths case userId is the dynamic segment. So userParams().userId will give us the value of userId from the URL.

// we use filter() method to filter out the places that are created by the user with the id that we extracted from the URL. place.creator === userId will return true if the place.creator is equal to the userId. It means that the place is created by the user with the id that we extracted from the URL.
