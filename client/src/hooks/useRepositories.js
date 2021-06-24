import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const sortCriteriaOptions = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const useRepositories = ({sortCriteria, filter}) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {...sortCriteriaOptions[sortCriteria], filter},
  });
  //console.log(data)
  return { repositories: data && data.repositories, loading, refetch};
};

export default useRepositories;