import React from 'react'
import Button from '../../Button'
import { StyleSheet } from 'react-native'
import { COLOR } from '../../../constants'

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
}

export function DoneButton(props: DoneProps) {
  const {
    state: { isDone },
    onPress,
  } = props
  return (
    <Button
      onPress={onPress}
      icon={isDone ? 'check' : 'restore'}
      style={isDone ? [styles.leftButton, styles.done] : styles.leftButton}
    />
  )
}

interface DeleteProps {
  onPress: () => void
}

export function DeleteButton(props: DeleteProps) {
  const { onPress } = props
  return <Button onPress={onPress} icon="delete" style={styles.rightButton} />
}
