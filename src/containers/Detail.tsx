import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Detail } from '../components/pages'

export default function ConnectedDetail() {
  const dispatch = useDispatch()
  const actions = React.useMemo(
    () => ({
      changeTodo(userId: string, id: string, newValues: Todo.Values) {
        dispatch(Todos.editTodo(userId, id, newValues))
      },
    }),
    [dispatch],
  )

  return <Detail actions={actions} />
}
