import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'

import * as Domain from '../../../domain/entities'
import { INPUT } from '../../../constants/path'
import Todos, { Actions as TodosActions } from './Todos'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})

interface Props {
  todos: Domain.Todo.Entity[]
  actions: {
    addTodo: (userId: string, todo: Domain.Todo.Values) => void
  } & TodosActions
}

export default function Home(props: Props) {
  const { navigate } = useNavigation()
  const gotoInput = useCallback(() => navigate(INPUT, { actions: props.actions }), [navigate, props.actions])
  React.useEffect(() => {
    async function logViewItemList() {
      await analytics().logViewItemList({
        item_category: 'todo',
      })
    }
    logViewItemList()
  }, [])

  return (
    <View style={styles.container}>
      <Todos {...props} />
      <TouchableOpacity onPress={gotoInput} style={styles.button}>
        <Icon color="white" size={24} name="plus" />
      </TouchableOpacity>
    </View>
  )
}
