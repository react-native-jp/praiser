import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import { COLOR } from '../../../constants/theme'
import DoneButton from './DoneButton'
import DeleteButton from './DeleteButton'
import TodoDisplay from './TodoDisplay'
import { State as TodoState } from '../../../lib/useToggle'

interface Props {
  state: TodoState
  forbiddenEdit: boolean
  rowRef?: any
  onDone?: () => void
  onDelete?: () => void
  onPress: (params: TodoState & { forbiddenEdit: boolean }) => () => void
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLOR.MAIN,
    height: 120,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default function Todo(props: Props) {
  const { state, forbiddenEdit, rowRef, onDone = () => {}, onDelete = () => {}, onPress } = props

  return (
    <SwipeRow
      disableLeftSwipe={forbiddenEdit}
      disableRightSwipe={forbiddenEdit}
      rightOpenValue={-80}
      leftOpenValue={80}
      ref={rowRef}
    >
      <View style={styles.contentContainer}>
        <DoneButton state={state} onPress={onDone} />
        <DeleteButton onPress={onDelete} />
      </View>
      <TodoDisplay
        onPress={onPress({ ...state, forbiddenEdit })}
        title={state.title}
        detail={state.detail}
        isDone={state.isDone}
      />
    </SwipeRow>
  )
}
