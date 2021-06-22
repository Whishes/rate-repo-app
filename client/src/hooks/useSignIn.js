import { useApolloClient, useMutation } from "@apollo/client";
import { useContext } from "react";
import useAuthStorage from "./useAuthStorage";
import { AUTH_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTH_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async (credentials) => {
    const { data } = await mutate({ variables: credentials })
    if (data && data.authorize) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    }
    return data;
  };

  return [signIn, result];
};

export default useSignIn;