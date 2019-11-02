import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import analytics from '@react-native-firebase/analytics'
import Input from '../../../containers/Input'
import * as Domain from '../../../domain/entities'
import Todos, { Actions as TodosActions } from './Todos'
import { COLOR } from '../../../constants'

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
    backgroundColor: COLOR.MAIN_DARK,
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
  actions: TodosActions
}

export default function Home(props: Props) {
  const [visible, changeVisible] = useState(false)
  const gotoInput = useCallback(() => changeVisible(true), [])
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
      <Input visible={visible} handleClose={() => changeVisible(false)} />

      <Todos {...props} />
      <TouchableOpacity onPress={gotoInput} style={styles.button}>
        <Icon color={COLOR.PRIMARY} size={24} name="plus" />
      </TouchableOpacity>
    </View>
  )
}
