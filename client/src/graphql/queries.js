import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $filter: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $filter) {
            edges{
                node{
                    id
                    ownerAvatarUrl
                    ownerName
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

export const REPOSITORY = gql`
    query singleRepo($id: ID!) {
        repository(id: $id) {
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
            url
        }
    }
`;

export const REPOSITORY_REVIEWS = gql`
query singleRepo($id: ID!) {
  repository(id: $id) {
    id
    reviews {
      edges {
        node {
          id
          text
          rating
          repositoryId
          createdAt
          user {
            username
          }
        }
      }
    }
  }
}
`;
