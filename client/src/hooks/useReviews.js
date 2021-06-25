import { useQuery } from '@apollo/client';
import { REPOSITORY_REVIEWS } from '../graphql/queries';

const useReviews = ({repositoryId, first}) => {
  const { data, loading, fetchMore, refetch} = useQuery(REPOSITORY_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {id: repositoryId, first},
  });
  //console.log("data:", data)
  
  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

      await fetchMore({
        query: REPOSITORY_REVIEWS,
        variables: {
            after: data?.repository.reviews.pageInfo.endCursor,
            id: repositoryId,
            first
          },
    });
    };


  return {
    results: data?.repository,
    fetchMore: handleFetchMore,
    loading,
      refetch
  }
};

export default useReviews;