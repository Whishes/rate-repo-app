import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    mutation authUser($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
`