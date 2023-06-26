import React from 'react';

import UsersItem from './UsersItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const UsersList = users => {
    if (users.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {users.items.map(user => (
                <UsersItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />
            ))}
        </ul>
    );
};
export default UsersList;

// users = props
