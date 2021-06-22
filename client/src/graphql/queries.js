import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories{
            edges{
                node{
                    id
                    ownerAvatarUrl
                    name
                    fullName
                    reviewCount
                    forksCount
                    language
                    description
                    ratingAverage
                    stargazersCount
                }
            }
        }
    }
`;

export const CHECK_USER_AUTH = gql`
    query {
        authorizedUser {
            username
        }
    }
`;