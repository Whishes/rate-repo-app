import React, { useState, useEffect} from 'react';
import Text from "./Text";
import theme from '../theme';
import { View, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { numberConversion, formatDate } from '../utils/helper';
import { useLazyQuery } from '@apollo/client';
import { REPOSITORY_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import * as WebBrowser from 'expo-web-browser';

const ItemSeparator = () => <View style={styles.separator} />;

const IndividualRepositoryView = ({ item, singleView=false }) => {
    const { id } = useParams();
    const [reviewData, setReviewData] = useState();
    //console.log(id)
    const [getReviews, { data, loading }] = useLazyQuery(REPOSITORY_REVIEWS);


    useEffect(() => {
        if (!Object.keys(item).length) {
            getReviews({ variables: { id } });
        }
        if (data && data.repository) {
            setReviewData(data.repository.reviews.edges.map(edge => edge.node));
        }
    }, [data?.repository.reviews]);

    return (
        <View>
            <FlatList data={reviewData}
                keyExtractor={review => review.id}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => (
                    <ReviewView review={item} />
                )}
                ListHeaderComponent={() => (
                    <SingleRepository item={item} singleView={singleView}/>
                )}
            />

            {loading && <Text>... Loading Reviews</Text>}
        </View>
    );
};

const ReviewView = ({ review }) => {
    
    //console.log(review)
    return (
        <View style={{flexDirection: "row", padding: 10}}>
            <View style={{ flex: 4, alignItems: "center", paddingTop: 10 }}>
                <View style={{height: 40, width: 40, borderRadius: 20, borderColor: theme.colors.primary, borderStyle: "solid", borderWidth: 2, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{ fontWeight: "bold", color: theme.colors.primary, fontSize: theme.fontSizes.subheading }}>
                        {review.rating}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 20, flexShrink: 1, padding: 5 }}>
                <View>
                    <Text style={{fontWeight: "bold", fontSize: theme.fontSizes.subheading}}>{review.user.username}</Text>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSizes.subheading }}>{formatDate(review.createAt)}</Text>
                </View>
                <Text style={{ flexShrink: 1 }}>{review.text}</Text>
            </View>
        </View>
    )
}

const SingleRepository = ({ item, singleView = false }) => {
    //console.log(item)
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{item.fullName}</Text>
                    <Text style={styles.heading}>{item.ownerName}</Text>
                    <Text style={styles.bodyText}>{item.description}</Text>
                    <Text style={styles.language} testID={`${item.id}/itemLanguage`}>{item.language}</Text>
                </View>
            </View>
            <RepoStats id={item.id} stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage} />

            {singleView && (
                <Pressable style={styles.linkButton} onPress={() => WebBrowser.openBrowserAsync(item.url)}>
                    <Text style={styles.buttonText}>
                        Open in Github
                    </Text>
                </Pressable>
            )}
        </View>
        
    );
}

const RepoStats = ({id, stars, forks, reviews, rating }) => {
    return (
        <View style={[styles.statsContainer, styles.infoContainer]}>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading} testID={`${id}/itemStars`}>{numberConversion(stars)}</Text>
                <Text style={styles.bodyText}>Stars</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading} testID={`${id}/itemForks`}>{numberConversion(forks)}</Text>
                <Text style={styles.bodyText}>Forks</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading} testID={`${id}/itemReviews`}>{numberConversion(reviews)}</Text>
                <Text style={styles.bodyText}>Reviews</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading} testID={`${id}/itemRating`}>{numberConversion(rating)}</Text>
                <Text style={styles.bodyText}>Rating</Text>
            </View>
        </View>
    );
};

export default IndividualRepositoryView;

const styles = StyleSheet.create({
    logo: {
        width: 55,
        height: 55,
        borderRadius: 5
    },
    container: {
        backgroundColor: "white"
    },
    imageContainer: {
        flex: 4,
        paddingLeft: 10
    },
    infoContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statsContainer: {
        justifyContent: "space-around",
        marginHorizontal: 20
    },
    textContainer: {
        flex: 10,
        justifyContent: "space-between"
    },
    language: {
        color: "white",
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        padding: 5,
        alignSelf: "flex-start"
    },
    heading: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold
    },
    bodyText: {
        color: theme.colors.textSecondary,
        paddingVertical: 3,
        fontSize: theme.fontSizes.body
    },
    statsHeading: {
        fontWeight: theme.fontWeights.bold,
        textAlign: "center",
        paddingVertical: 3
    },
    individualStatContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    separator: {
        height: 10,
    },
        linkButton: {
        color: "white",
        textAlign: "center",
        borderRadius: 5,
        padding: 10,
        backgroundColor: theme.colors.primary,
            fontWeight: "bold",
        margin: 5
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
});