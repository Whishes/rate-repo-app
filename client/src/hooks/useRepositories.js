import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const sortCriteriaOptions = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const useRepositories = ({sortCriteria, filter, first}) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {...sortCriteriaOptions[sortCriteria], filter, first},
  });
  //console.log(data)
  
  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (filter) {
      return;
    }
    if (!canFetchMore) {
      return;
    }

    await fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first,
        ...sortCriteriaOptions[sortCriteria],
        filter
      }
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  }
};

export default useRepositories;