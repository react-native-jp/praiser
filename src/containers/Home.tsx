import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTodos } from '../selectors/todos'
import * as Todos from '../usecases/todos'
import { Home } from '../components/pages'
import { UserContext } from '../contexts'
import { assertIsDefined } from '../lib/assert'

export default function ConnectedHome() {
  const todos = useSelector(getTodos)
  const { userState } = React.useContext(UserContext)
  assertIsDefined(userState)

  const dispatch = useDispatch()
  const actions = React.useMemo(
    () => ({
      removeTodo(id: string) {
        dispatch(Todos.removeAndSync(userState.id, id))
      },
      toggleTodo(id: string) {
        dispatch(Todos.toggleAndSync(userState.id, id))
      },
    }),
    [dispatch],
  )

  return <Home todos={todos} actions={actions} />
}
