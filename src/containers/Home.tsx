import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import getTodos from '../selectors/get-todos'
import * as Todos from '../usecases/todos'
import { Home } from '../components/pages'

export default function ConnectedHome() {
  const todos = useSelector(getTodos)

  const dispatch = useDispatch()
  const actions = React.useMemo(
    () => ({
      removeTodo(userId: string, id: string) {
        dispatch(Todos.removeAndSync(userId, id))
      },
      toggleTodo(userId: string, id: string) {
        dispatch(Todos.toggleAndSync(userId, id))
      },
    }),
    [dispatch],
  )

  return <Home todos={todos} actions={actions} />
}
