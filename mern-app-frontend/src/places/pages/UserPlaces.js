import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2022-06/iStock-937427130%20%281%29.jpg?itok=osCyvhw5.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: { lat: 40.7484405, lng: -73.9878531 },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2022-06/iStock-937427130%20%281%29.jpg?itok=osCyvhw5.jpg',
        address: '20 W 34th St., New York, NY 10001',
        creator: 'u2'
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;

// useParam() hook is used to extract dynamic segments from the URL. in ths case userId is the dynamic segment. So userParams().userId will give us the value of userId from the URL.

// we use filter() method to filter out the places that are created by the user with the id that we extracted from the URL. place.creator === userId will return true if the place.creator is equal to the userId. It means that the place is created by the user with the id that we extracted from the URL.
