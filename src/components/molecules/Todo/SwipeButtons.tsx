import React from 'react'
import { StyleSheet } from 'react-native'
import { COLOR } from '../../../constants'
import IconButton from '../../atoms/IconButton'
import testIDs from '../../../constants/testIDs'

const styles = StyleSheet.create({
  leftButton: {
    backgroundColor: COLOR.PRIMARY,
  },
  done: {
    backgroundColor: COLOR.MAIN_DARK,
  },
  rightButton: {
    backgroundColor: COLOR.CAUTION,
  },
})

interface DoneProps {
  state: State
  onPress: () => void
}
export type State = {
  id: string
  title: string
  detail?: string
  isDone?: boolean
  testID?: string
}

export function DoneButton(props: DoneProps) {
  const {
    state: { isDone },
    onPress,
  } = props
  return (
    <IconButton
      onPress={onPress}
      icon={isDone ? 'restore' : 'check'}
      style={isDone ? styles.done : styles.leftButton}
      testID={isDone ? testIDs.TODO_ROW_NOT_DONE : testIDs.TODO_ROW_DONE}
    />
  )
}

interface DeleteProps {
  onPress: () => void
}

export function DeleteButton(props: DeleteProps) {
  const { onPress } = props
  return (
    <IconButton
      onPress={onPress}
      icon="delete"
      style={styles.rightButton}
      testID={testIDs.TODO_ROW_DELETE}
    />
  )
}
