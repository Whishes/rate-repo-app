import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from "./ReviewForm";
import RepositoryItem from './RepositoryItem';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    flexShrink: 1,
    flexGrow: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/review">
          <ReviewForm />
        </Route>
        <Route path="/myreviews">
          <MyReviews />
        </Route>
        <Route path="/:id" exact>
          <RepositoryItem singleView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;