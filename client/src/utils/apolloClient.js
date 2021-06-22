import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from "expo-constants";
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: Constants.manifest.extra.APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (error) {
      console.log("Error: ", error);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;