import React from 'react'
import Button from '../../Button'
import { StyleSheet } from 'react-native'
import { COLOR } from '../../../constants'
import testIDs from '../../../constants/testIDs'

const styles = StyleSheet.create({
  leftButton: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
    width: 80,
  },
  done: {
    backgroundColor: COLOR.MAIN_DARK,
  },
  rightButton: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.CAUTION,
    width: 80,
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
    <Button
      onPress={onPress}
      icon={isDone ? 'restore' : 'check'}
      color={isDone ? COLOR.MAIN_DARK : COLOR.PRIMARY}
      style={isDone ? [styles.leftButton, styles.done] : styles.leftButton}
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
    <Button
      onPress={onPress}
      icon="delete"
      style={styles.rightButton}
      color={COLOR.CAUTION}
      testID={testIDs.TODO_ROW_DELETE}
    />
  )
}
