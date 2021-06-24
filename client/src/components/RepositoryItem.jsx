import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from "../components/Text";
import IndividualRepositoryView from './IndividualRepositoryView';
import theme from '../theme';
import { useState} from 'react';
import { useLazyQuery } from '@apollo/client';
import { REPOSITORY} from '../graphql/queries';
import { useEffect } from 'react';
import { useParams } from 'react-router-native';

const RepositoryItem = ({ item={}, singleView=false }) => {
    const [itemData, setItemData] = useState(item);
    const [getSingleItem, { data, loading }] = useLazyQuery(REPOSITORY);
    const { id } = useParams();

    useEffect(() => {
        if (!Object.keys(item).length) {
            getSingleItem({ variables: { id } });
        }
        if (data && data.repository) {
            setItemData(data?.repository);
        }
    }, [data?.repository]);

    if (loading) {
        return (
            <Text>
                ...Loading
            </Text>
        );
    };

    return itemData && (
        <View style={styles.container}>
            <IndividualRepositoryView item={itemData} singleView={singleView}/>
        </View>
    );
};

export default RepositoryItem;

const styles = StyleSheet.create({
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
    container: {
        backgroundColor: "white"
    },
});
