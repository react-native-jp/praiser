import * as React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Modal } from 'react-native'
import { IconButton } from 'react-native-paper'
import SafeAreaView from 'react-native-safe-area-view'
import useTextInput from '../../lib/hooks/use-TextInput'
import useNetworker from '../../lib/hooks/use-networker'
import { userContext } from '../../contexts'
import TextField, { dismiss } from '../TextField'
import Button from '../Button'
import { COLOR } from '../../constants'
import { Todo } from '../../domain/entities'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: COLOR.MAIN,
  },
  text: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})

interface Props {
  visible: boolean
  handleClose?: () => void
  actions: {
    addTodo: (userId: string, newValues: Todo.Values) => void
  }
}

export default function Input(props: Props) {
  const { visible, handleClose = () => {}, actions } = props
  const title = useTextInput('')
  const detail = useTextInput('')
  const networker = useNetworker()
  const { userState } = React.useContext(userContext)
  const addTodo = React.useCallback(async () => {
    await networker(async () => {
      actions.addTodo(userState.id, { title: title.value, detail: detail.value })
      handleClose()
      title.onChangeText('')
      detail.onChangeText('')
    })
  }, [networker, actions, userState.id, detail, title, handleClose])

  return (
    <Modal visible={visible} onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={dismiss}>
          <View style={styles.container}>
            <IconButton icon="close" size={30} color={COLOR.PRIMARY} onPress={handleClose} style={styles.iconButton} />
            <TextField label="Title" value={title.value} onChangeText={title.onChangeText} style={styles.text} />
            <TextField label="Detail" value={detail.value} onChangeText={detail.onChangeText} style={styles.text} />
            <Button onPress={addTodo} label="Add" style={styles.button} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  )
}
