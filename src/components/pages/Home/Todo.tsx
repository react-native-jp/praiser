import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from 'react-navigation-hooks'
import { SwipeRow } from 'react-native-swipe-list-view'
import analytics from '@react-native-firebase/analytics'
import Button from '../../../components/Button'
import { uiContext, userContext } from '../../../contexts'
import { DETAIL } from '../../../constants/path'
import { COLOR } from '../../../constants'

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
interface Props {
  actions: Actions
  state: State
  forbiddenEdit?: boolean
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

export default function Todo(props: Props) {
  const { state, actions, forbiddenEdit } = props
  const { userState } = React.useContext(userContext)
  const { navigate } = useNavigation()
  const rowRef = React.useRef<any>(null)
  const gotoDetail = React.useCallback(() => navigate(DETAIL, { ...state, forbiddenEdit }), [
    forbiddenEdit,
    navigate,
    state,
  ])
  const { setError } = React.useContext(uiContext)
  const toggleTodo = React.useCallback(async () => {
    try {
      actions.toggleTodo(userState.id, state.id)
      const eventName = state.isDone ? 'complete_todo' : 'uncomplete_todo'
      await analytics().logEvent(eventName, {
        id: state.id,
        name: state.title,
      })
      rowRef.current.closeRow()
    } catch (error) {
      setError(error)
    }
  }, [actions, state.isDone, state.id, state.title, setError, userState.id])
  return (
    <SwipeRow
      disableLeftSwipe={forbiddenEdit}
      disableRightSwipe={forbiddenEdit}
      rightOpenValue={-80}
      leftOpenValue={80}
      ref={rowRef}
    >
      <View style={[styles.contentContainer]}>
        {state.isDone ? (
          <Button onPress={toggleTodo} icon="check" style={styles.leftButton} />
        ) : (
          <Button onPress={toggleTodo} icon="restore" style={[styles.leftButton, styles.done]} />
        )}
        <Button
          onPress={() => {
            actions.removeTodo(userState.id, state.id)
          }}
          icon="delete"
          style={styles.rightButton}
        />
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
