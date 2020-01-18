import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Todo from '../molecules/Todo'
import { Actions as TodoActions } from '../molecules/Todo/useToggle'
import { COLOR } from '../../constants/theme'

export type Actions = TodoActions
interface Props {
  todos: TodoState[]
  actions: Actions
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
})

export default function Todos(props: Props) {
  return (
    <FlatList
      style={styles.container}
      data={props.todos}
      renderItem={({ item }) => <Todo state={item} actions={props.actions} forbiddenEdit={false} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
    />
  )
}
