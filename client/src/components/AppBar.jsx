import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.background.barBackground,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}><Text>Repositories</Text></Link>
        <Link to="/signin" component={AppBarTab}><Text>Sign In</Text></Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;