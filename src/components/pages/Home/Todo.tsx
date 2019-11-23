import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from 'react-navigation-hooks'
import { SwipeRow } from 'react-native-swipe-list-view'
import analytics from '@react-native-firebase/analytics'
import { uiContext, userContext } from '../../../contexts'
import { DETAIL } from '../../../constants/path'
import { COLOR } from '../../../constants'
import { DoneButton, DeleteButton } from './SwipeButtons'

export interface Actions {
  removeTodo: (userId: string, id: string) => void
  toggleTodo: (userId: string, id: string) => void
}
export type State = {
  id: string
  title: string
  detail?: string
  isDone?: boolean
}
interface EnableEditProps {
  actions: Actions
  state: State
  forbiddenEdit: false
}
interface DisableEditProps {
  state: State
  forbiddenEdit: true
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
  displayContent: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLOR.WHITE,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
  detail: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
  detailButton: {
    width: 32,
  },
})

function useToggle(props: EnableEditProps | DisableEditProps) {
  const { state } = props
  const { setError } = React.useContext(uiContext)
  const { userState } = React.useContext(userContext)
  const rowRef = React.useRef<any>(null)
  // @todo ちょっとしらべます
  const toggleTodo = React.useCallback(async () => {
    try {
      !props.forbiddenEdit && props.actions.toggleTodo(userState.id, state.id)
      const eventName = state.isDone ? 'complete_todo' : 'uncomplete_todo'
      await analytics().logEvent(eventName, {
        id: state.id,
        name: state.title,
      })
      rowRef.current.closeRow()
    } catch (error) {
      setError(error)
    }
  }, [props.forbiddenEdit, props.actions, userState.id, state.id, state.isDone, state.title, setError])
  const removeTodo = React.useCallback(() => {
    !props.forbiddenEdit && props.actions.removeTodo(userState.id, state.id)
  }, [props.forbiddenEdit, props.actions, userState.id, state.id])

  return {
    toggleTodo,
    rowRef,
    removeTodo,
  }
}

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
      <View style={[styles.contentContainer]}>
        <DoneButton state={state} onPress={toggleTodo} />
        <DeleteButton onPress={removeTodo} />
      </View>
      <TouchableHighlight style={[styles.contentContainer, styles.displayContent]} onPress={gotoDetail}>
        <View style={styles.contentContainer}>
          <View>
            <Text style={[styles.title, !forbiddenEdit && !state.isDone ? styles.doneText : null]}>{state.title}</Text>
            {state.detail && <Text style={styles.detail}>{state.detail}</Text>}
          </View>
          <TouchableOpacity style={styles.detailButton} onPress={toggleTodo}>
            <Icon name="angle-right" size={32} color={COLOR.WHITE} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  )
}
