import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Todo from '../molecules/Todo';
import { COLOR } from '../../constants/theme';
import { Actions as TodoActions, State as TodoState } from '../molecules/Todo/useToggle';

type Actions = TodoActions;
type State = TodoState[];
interface Props {
  todos: State;
  actions: Actions;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
});

export default function Todos(props: Props) {
  return (
    <FlatList
      style={styles.container}
      data={props.todos}
      renderItem={({ item }) => <Todo state={item} actions={props.actions} forbiddenEdit={false} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
    />
  );
}
