import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Todo, { Actions as TodoActions, State as TodoState } from './Todo';
import { COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
});

export type Actions = TodoActions;
export type State = TodoState[];
interface EditableProps {
  isEditable: true;
  todos: State;
  actions: Actions;
}
interface ReadonlyPrpos {
  isEditable: false;
  todos: State;
  header: React.ReactElement;
}

type Props = EditableProps | ReadonlyPrpos;

export default function Todos(props: Props) {
  if (props.isEditable) {
    return (
      <FlatList
        style={styles.container}
        data={props.todos}
        renderItem={({ item }) => <Todo state={item} actions={props.actions} isEditable={props.isEditable} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id}
      />
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={props.todos}
      renderItem={({ item }) => <Todo state={item} isEditable={props.isEditable} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={props.header}
    />
  );
}
