import React, {useState} from 'react';
import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import { useHistory } from 'react-router-native';
import Sorting from './Sorting';
import FilterBar from './FilterBar';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, setFilter, sorting, setSortingCriteria } = this.props

    return (
      <>
        <FilterBar filter={filter} setFilter={setFilter} />
        <Sorting setSortingCriteria={setSortingCriteria} sorting={sorting} />
      </>
    );
  };

  render() {
    const { repositories, history} = this.props
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node): [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={repository => repository.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => history.push(`/${item.id}`)}>
            <View>
              <RepositoryItem item={item} />
            </View>
          </Pressable>
        )}
      />
    );
  };
}

const RepositoryList = () => {
  const [sorting, setSortingCriteria] = useState("latest");
  const [filter, setFilter] = useState("");
  const { repositories } = useRepositories({ sortCriteria: sorting, filter });
  const history = useHistory();

  return <RepositoryListContainer repositories={repositories} setSortingCriteria={setSortingCriteria} sorting={sorting} filter={filter} setFilter={setFilter} history={history}/>;
};

export default RepositoryList;