import React from 'react';
import { StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        padding: 10
    }
});

const AppBarTab = (props) => {
    return (
        <Text style={styles.text} {...props} />
    );
};

export default AppBarTab;
