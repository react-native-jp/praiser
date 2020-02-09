import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { SwipeRow } from 'react-native-swipe-list-view'
import { DETAIL } from '../../../constants/path'
import { COLOR } from '../../../constants'
import DoneButton from './DoneButton'
import DeleteButton from './DeleteButton'
import TodoDisplay from './TodoDisplay'
import useToggle, { EnableEditProps, DisableEditProps } from './useToggle'

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

export default function Todo(props: EnableEditProps | DisableEditProps) {
  const { state, forbiddenEdit } = props
  const { navigate } = useNavigation()
  const gotoDetail = React.useCallback(() => navigate(DETAIL, { ...state, forbiddenEdit }), [
    forbiddenEdit,
    navigate,
    state,
  ])
  const { toggleTodo, rowRef, removeTodo } = useToggle(props)
  return (
    <SwipeRow
      disableLeftSwipe={forbiddenEdit}
      disableRightSwipe={forbiddenEdit}
      rightOpenValue={-80}
      leftOpenValue={80}
      ref={rowRef}
    >
      <View style={styles.contentContainer}>
        <DoneButton state={state} onPress={toggleTodo} />
        <DeleteButton onPress={removeTodo} />
      </View>
      <TodoDisplay onPress={gotoDetail} title={state.title} detail={state.detail} isDone={state.isDone} />
    </SwipeRow>
  )
}
