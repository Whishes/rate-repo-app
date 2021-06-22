import React from 'react';
import { StyleSheet, View, Pressable} from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "white",
      paddingHorizontal: 10,
    height: 200,
        justifyContent: "space-evenly"
  },
  loginButton: {
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: theme.colors.primary,
    fontWeight: "bold"
  }
});

const initialValues = {
  username: "",
  password: ""
};

const validationSchema = yup.object().shape({
  username: yup.string().trim().required("Username is required"),
  password: yup.string().trim().required("Password is required")
});

const SignInForm = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    //console.log("onSubmit Value log: ", values);
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push("/")
      //console.log("SignIn data log: ", data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => {
      return ( 
        <View style={styles.formContainer}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
          <Pressable onPress={handleSubmit}>
            <Text
              style={styles.loginButton}
            >Sign in</Text>
          </Pressable>
        </View>
      );
    }}
    </Formik>

  );
};

export default SignInForm;