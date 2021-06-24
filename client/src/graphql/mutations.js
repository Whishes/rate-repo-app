import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    mutation authUser($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
`

export const ADD_REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
        createReview(review: {
            repositoryName: $repositoryName,
            ownerName: $ownerName,
            rating: $rating,
            text: $text
        }) {
            id
            text
            createdAt
            rating
            repositoryId
            user {
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: {username: $username, password: $password}) {
            username
        }
    }
`;