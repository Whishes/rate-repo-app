import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from "./Text";
import theme from '../theme';

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
        flex: 2.5,
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
    }

});

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{item.fullName}</Text>
                    <Text style={styles.bodyText}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <RepoStats stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage}/>
        </View>
    );
};

const RepoStats = ({ stars, forks, reviews, rating }) => {
    const numberConversion = (value) => {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + "k";
        } else {
            return value;
        }
    };

    return (
        <View style={[styles.statsContainer, styles.infoContainer]}>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading}>{numberConversion(stars)}</Text>
                <Text style={styles.bodyText}>Stars</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading}>{numberConversion(forks)}</Text>
                <Text style={styles.bodyText}>Forks</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading}>{numberConversion(reviews)}</Text>
                <Text style={styles.bodyText}>Reviews</Text>
            </View>
            <View style={styles.individualStatContainer}>
                <Text style={styles.statsHeading}>{numberConversion(rating)}</Text>
                <Text style={styles.bodyText}>Rating</Text>
            </View>
        </View>
    );
};

export default RepositoryItem;
