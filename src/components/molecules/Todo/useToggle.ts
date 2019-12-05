import * as React from 'react'
import analytics from '@react-native-firebase/analytics'
import { uiContext, userContext } from '../../../contexts'

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
export interface EnableEditProps {
  actions: Actions
  state: State
  forbiddenEdit: false
}
export interface DisableEditProps {
  state: State
  forbiddenEdit: true
}

export default function useToggle(props: EnableEditProps | DisableEditProps) {
  const { state } = props
  const { setError } = React.useContext(uiContext)
  const { userState } = React.useContext(userContext)
  const rowRef = React.useRef<any>(null)
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
  }, [
    props.forbiddenEdit,
    !props.forbiddenEdit && props.actions,
    userState.id,
    state.id,
    state.isDone,
    state.title,
    setError,
  ])
  const removeTodo = React.useCallback(() => {
    !props.forbiddenEdit && props.actions.removeTodo(userState.id, state.id)
  }, [props.forbiddenEdit, !props.forbiddenEdit && props.actions, userState.id, state.id])

  return {
    toggleTodo,
    rowRef,
    removeTodo,
  }
}
