import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { CHECK_USER_AUTH } from '../graphql/queries'
import { View, StyleSheet, FlatList } from "react-native";
import Text from './Text';
import {ReviewView} from './IndividualRepositoryView';

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, loading, refetch } = useQuery(CHECK_USER_AUTH, { variables: { includeReviews: true } })
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        if (data?.authorizedUser) {
            setUserReviews(data?.authorizedUser.reviews.edges.map(edges => edges.node))
        }
    }, [data?.authorizedUser])

    let reviewsOnly = true

    return (
        <View style={styles.background}>
            <FlatList data={userReviews}
                keyExtractor={review => review.id}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => (
                    <ReviewView review={item} reviewsOnly={reviewsOnly} refetch={refetch}/>
                )}
                />
                {loading && <Text>Loading reviews...</Text>}
        </View>
    )
}

export default MyReviews

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    background: {
        backgroundColor: "white"
    }
});