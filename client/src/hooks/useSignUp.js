import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";

const useSignUp = () => {
    const [mutate, result] = useMutation(ADD_USER);

    const signUp = async (credentials) => {
        const { data } = await mutate({ variables: credentials })
        return data;
    }
    return [signUp, result]
}

export default useSignUp;