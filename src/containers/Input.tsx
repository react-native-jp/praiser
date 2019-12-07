import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Input } from '../components/pages'

export default function ConnectedInput() {
  const dispatch = useDispatch()
  const actions = React.useMemo(
    () => ({
      addTodo(userId: string, newValues: Todo.Values) {
        dispatch(Todos.addAndSync(userId, newValues))
      },
    }),
    [dispatch],
  )

  return <Input actions={actions} />
}
