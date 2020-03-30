import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import * as Todo from './Todo';
import { COLOR } from '../../../constants/theme';

export { Todo };
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
});

export type State = Array<Todo.State>;
interface EditableProps {
  isEditable: true;
  todos: State;
  actions: Todo.EditableActions;
}
interface ReadonlyPrpos {
  isEditable: false;
  todos: State;
  header: React.ReactElement;
  actions: Todo.ReadonlyActions;
}

type Props = EditableProps | ReadonlyPrpos;

export default function Todos(props: Props) {
  if (props.isEditable) {
    return (
      <FlatList
        style={styles.container}
        data={props.todos}
        renderItem={({ item }) => <Todo.Component isEditable={props.isEditable} state={item} actions={props.actions} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id}
      />
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={props.todos}
      renderItem={({ item }) => <Todo.Component isEditable={props.isEditable} state={item} actions={props.actions} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={props.header}
    />
  );
}
