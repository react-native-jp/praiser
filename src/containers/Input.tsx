import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Input } from '../components/pages'
import { UserContext } from '../contexts'

export default function ConnectedInput() {
  const dispatch = useDispatch()
  const { userState } = React.useContext(UserContext)
  const actions = React.useMemo(
    () => ({
      addTodo(newValues: Todo.Values) {
        dispatch(Todos.addAndSync(userState.id, newValues))
      },
    }),
    [dispatch],
  )

  return <Input actions={actions} />
}
