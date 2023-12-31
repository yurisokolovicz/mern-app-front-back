import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/UIElements/Avatar';
import Card from '../../shared/UIElements/Card';
import './UsersItem.css';

const UsersItem = usersList => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${usersList.id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={`http://localhost:5000/${usersList.image}`} alt={usersList.name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{usersList.name}</h2>
                        <h3>
                            {usersList.placeCount} {usersList.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};
export default UsersItem;

// usersList = props
