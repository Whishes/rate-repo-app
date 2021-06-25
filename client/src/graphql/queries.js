import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $filter: String, $first: Int, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $filter, first: $first, after: $after) {
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
                cursor
            }
            totalCount
            pageInfo {
              endCursor
              startCursor
              hasNextPage
            }
        }
    }
`;

export const CHECK_USER_AUTH = gql`
    query ($includeReviews: Boolean = false) {
        authorizedUser {
            username
            reviews @include(if: $includeReviews) {
              edges {
                node {
                  id
                  text
                  rating
                  repositoryId
                  repository {
                    fullName
                  }
                  createdAt
                  user {
                    username
                  }
                }
                cursor
              }
              pageInfo {
                endCursor
                startCursor
                hasNextPage
              }
            }
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
query singleRepo($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    reviews(first: $first, after: $after) {
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
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`;
