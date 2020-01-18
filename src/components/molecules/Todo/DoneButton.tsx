import React from 'react'
import { StyleSheet } from 'react-native'
import { COLOR } from '../../../constants/theme'
import IconButton from '../../atoms/IconButton'
import testIDs from '../../../constants/testIDs'

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.PRIMARY,
  },
  done: {
    backgroundColor: COLOR.MAIN_DARK,
  },
})

interface DoneProps {
  state: TodoState
  onPress: () => void
}

export default function DoneButton(props: DoneProps) {
  const {
    state: { isDone },
    onPress,
  } = props
  return (
    <IconButton
      onPress={onPress}
      icon={isDone ? 'restore' : 'check'}
      style={isDone ? styles.done : styles.button}
      testID={isDone ? testIDs.TODO_ROW_NOT_DONE : testIDs.TODO_ROW_DONE}
    />
  )
}
