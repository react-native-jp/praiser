import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Todo, { Actions as TodoActions, State as TodoState } from './Todo'

export type Actions = TodoActions
export type State = TodoState[]
interface Props {
  todos: State
  actions: Actions
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
})

export default (props: Props) => (
  <FlatList
    style={styles.container}
    data={props.todos}
    renderItem={({ item }) => <Todo state={item} actions={props.actions} />}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    keyExtractor={item => item.id}
  />
)
