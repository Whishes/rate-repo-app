import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link, useHistory } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client"
import useAuthStorage from '../hooks/useAuthStorage';
import { CHECK_USER_AUTH } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.background.barBackground,
  },
});

const AppBar = () => {
  const { data } = useQuery(CHECK_USER_AUTH);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push("/");
  };



  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}><Text>Repositories</Text></Link>
        {data && data.authorizedUser
          ? <View>
              <Link to="review" component={AppBarTab}>Create a review</Link>
              <AppBarTab onPress={signOut}>Logout</AppBarTab>
            </View>
          : <View>
            <Link to="/signin" component={AppBarTab}><Text>Sign In</Text></Link>
            <Link to="/signup" component={AppBarTab}><Text>Sign Up</Text></Link>
            </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;