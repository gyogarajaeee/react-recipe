import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({recipe}) => (
    <li>
        <Link to={`/recipe/${recipe._id}`}>
            <h4>{recipe.name}</h4>
        </Link>
        <p>{recipe.category}</p>
    </li>
);

export default RecipeItem;
