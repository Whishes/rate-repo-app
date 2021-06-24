import React from 'react'
import { View, Pressable } from 'react-native'
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import * as yup from "yup";
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { ADD_REVIEW } from '../graphql/mutations';
import theme from '../theme';

const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: ""
}

const ReviewForm = () => {
    const [createReview] = useMutation(ADD_REVIEW);
    const history = useHistory();

    const addReview = async (reviewInput) => {
        const formatInput = { ...reviewInput, rating: Number(reviewInput.rating) };

        try {
            const { data } = await createReview({ variables: formatInput })
            if (data?.createReview) {
                history.push(`/${data.createReview.repositoryId}`);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={addReview} validationSchema={validationSchema}>
            {({ handleSubmit }) => {
            return ( 
                <View style={{paddingHorizontal: 10, paddingVertical: 10, justifyContent: "space-evenly", backgroundColor: "white"}}>
                    <FormikTextInput name='ownerName' placeholder='Repository Owner Name' />
                    <FormikTextInput name='repositoryName' placeholder='Repository name' />
                    <FormikTextInput name="rating" placeholder="Rating between 0 and 100" keyboardType='numeric' />
                    <FormikTextInput name="text" placeholder="Review" multiline />    
                    <Pressable onPress={handleSubmit}>
                        <Text style={{color: "white",
                            textAlign: "center",
                            borderRadius: 5,
                            padding: 10,
                            backgroundColor: theme.colors.primary,
                            fontWeight: "bold", marginVertical: 5}}>Create New Review</Text>
                    </Pressable>
                </View>
            );
        }}
        </Formik>
    )
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .trim()
    .required('Repository owner username is required'),
  repositoryName: yup
    .string()
    .trim()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximium rating is 100')
    .required('Please provide a rating between 0 and 100'),
  text: yup
    .string()
    .trim()
});

export default ReviewForm
