import React from 'react';
import {Link} from 'react-router-dom';

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({session}) => (
    <div>
        <h3> User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>{session.getCurrentUser.username}'s Favourites</h3>
            {session.getCurrentUser.favorites.map(recipe => (
                <li key={recipe._id}>
                    <Link to={`/recipe/${recipe._id}`}><p>{recipe.name}</p></Link>
                </li>
            ))}
            {!session.getCurrentUser.favorites.length && <p>You Have no favorites currently. Go Add Some!</p>}
        </ul>
    </div>
);

export default UserInfo;