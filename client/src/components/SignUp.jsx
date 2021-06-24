import React from 'react';
import useSignIn from "../hooks/useSignIn"
import useSignUp from '../hooks/useSignUp';
import * as yup from 'yup';
import { Formik } from 'formik';
import { StyleSheet, View, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: "",
  password: ""
};



const SignUp = () => {
  const [signUp] = useSignUp();
    const [signIn] = useSignIn();
      const history = useHistory();

  const onSubmit = async (credentials) => {
    const { username, password } = credentials;
    try {
      await signUp(credentials);
      await signIn({ username, password });
        history.push("/")
    } catch (error) {
      console.error(error);
    }
  };

  return <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => {
      return ( 
        <View style={{paddingHorizontal: 10, paddingVertical: 10, justifyContent: "space-evenly", backgroundColor: "white"}}>
          <FormikTextInput name='username' placeholder='Username'/>
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
          <FormikTextInput name='confirm' placeholder='Confirm Password' secureTextEntry />
          <Pressable onPress={handleSubmit}>
            <Text>Sign up</Text>
          </Pressable>
        </View>
      );
    }}
    </Formik>
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username is too short')
    .max(30, 'Username is too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Username is too short')
    .max(50, 'Username is too long')
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required')
});

export default SignUp;