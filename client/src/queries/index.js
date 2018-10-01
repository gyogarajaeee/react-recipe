import { gql } from 'apollo-boost';

/* Recipies Queries */
export const GET_ALL_RECIPES = gql`
query{
    getAllRecipes{
      _id
      name
      description
      instructions
      category
      likes
      username
    }
}`;

/* Recipies Mutations */

/* User Queries */

/* User Mutations */
export const SIGNUP_USER = gql`
mutation($username: String!, $email: String!, $password: String!){
  signupUser(username: $username, email: $email, password: $password){
    token
  }
}
`;