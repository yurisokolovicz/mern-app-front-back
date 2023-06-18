import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Jeniffer',
            image: 'https://global.cdn.magazord.com.br/topmodel/img/2023/03/produto/18985/l-blusa-termica-gola-careca-vera-top-model-preto.jpg?ims=fit-in/600x900/filters:fill(white)',
            places: 3
        }
    ];

    return <UsersList items={USERS} />;
};

export default Users;

// Props chain -> src/user/pages/Users.js -> src/user/components/UsersList.js -> src/user/components/UsersItem.js -> src/shared/UIElements/Avatar.js
