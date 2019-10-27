import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from 'react-navigation-hooks'

import { userContext } from '../../../contexts'
import { DETAIL } from '../../../constants/path'
import * as Domain from '../../../domain/entities'

export interface Actions {
  removeTodo: (userId: string, id: string) => void
  toggleTodo: (userId: string, id: string) => void
}
export type State = Domain.Todo.Entity
interface Props {
  actions: Actions
  state: State
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    margin: 4,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  detail: {
    fontSize: 16,
  },
  detailButton: {
    width: 32,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
})

export default function Todo(props: Props) {
  const { userState } = React.useContext(userContext)
  const { navigate } = useNavigation()
  const gotoDetail = React.useCallback(() => navigate(DETAIL), [])
  const backgroundStyle = props.state.completedAt ? { backgroundColor: 'gray' } : null

  return (
    <TouchableOpacity
      style={[styles.container, backgroundStyle]}
      onPress={() => {
        props.actions.toggleTodo(userState.id, props.state.id)
      }}
    >
      <View>
        <Text style={styles.title}>{props.state.title}</Text>
        {props.state.detail && <Text style={styles.detail}>{props.state.detail}</Text>}
      </View>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => {
          gotoDetail()
        }}
      >
        <Icon name="angle-right" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          props.actions.removeTodo(userState.id, props.state.id)
        }}
      >
        <Icon name="times-circle" size={16} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
