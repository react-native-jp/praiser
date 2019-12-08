import * as React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { IconButton } from 'react-native-paper'
import { useNavigation } from 'react-navigation-hooks'

import { COLOR } from '../../../constants'
import testIDs from '../../../constants/testIDs'
import { Todo } from '../../../domain/models'
import Button from '../../Button'
import TextField, { dismiss } from '../../TextField'
import { useControlledComponent } from '../../../lib/hooks/'

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
  actions: {
    addTodo: (newValues: Todo.Values) => void
  }
}

export default function Input(props: Props) {
  const title = useControlledComponent('')
  const detail = useControlledComponent('')

  const { goBack } = useNavigation()
  const back = React.useCallback(() => {
    goBack()
  }, [goBack])

  const addTodo = React.useCallback(() => {
    props.actions.addTodo({
      title: title.value,
      detail: detail.value,
    })
    back()
    title.onChangeText('')
    detail.onChangeText('')
  }, [title, detail, props.actions])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismiss} testID={testIDs.TODO_INPUT_DISMISS}>
        <View style={styles.container} testID={testIDs.TODO_INPUT_SCREEN}>
          <IconButton
            icon="close"
            size={30}
            color={COLOR.PRIMARY}
            onPress={back}
            style={styles.iconButton}
            testID={testIDs.TODO_INPUT_CLOSE}
          />
          <TextField
            label="Title"
            value={title.value}
            onChangeText={title.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_TITLE}
          />
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_DETAIL}
          />
          <Button
            onPress={addTodo}
            label="Add"
            style={styles.button}
            disabled={!title.value}
            testID={testIDs.TODO_INPUT_ADD_BUTTON}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
