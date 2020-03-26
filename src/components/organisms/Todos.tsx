import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Todo from '../molecules/Todo';
import { Actions as TodoActions, State as TodoState } from '../../lib/hooks/useToggle';
import { COLOR } from '../../constants/theme';
import useToggleType from '../../lib/hooks/useToggle';

type Actions = TodoActions;
type State = TodoState[];
type OnPress = (
  params: {
    forbiddenEdit: boolean;
  } & TodoState,
) => () => void;
interface Props {
  todos: State;
  actions: Actions;
  forbiddenEdit: boolean;
  useToggle: typeof useToggleType;
  onPress: OnPress;
}
interface ItemProps {
  state: TodoState;
  actions: Actions;
  onPress: OnPress;
  useToggle: typeof useToggleType;
  forbiddenEdit: boolean;
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

function Item(props: ItemProps) {
  const { state, actions, onPress, useToggle, forbiddenEdit } = props;
  const { toggleTodo, rowRef, removeTodo } = useToggle({
    state,
    actions,
    forbiddenEdit,
  });
  return (
    <Todo
      state={state}
      onDone={toggleTodo}
      onDelete={removeTodo}
      rowRef={rowRef}
      forbiddenEdit={false}
      onPress={onPress}
    />
  );
}

export default function Todos(props: Props) {
  const { todos, onPress, useToggle, actions, forbiddenEdit } = props;

  return (
    <FlatList
      style={styles.container}
      data={todos}
      renderItem={({ item }) => (
        <Item state={item} actions={actions} forbiddenEdit={forbiddenEdit} onPress={onPress} useToggle={useToggle} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
    />
  );
}
