import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Detail } from '../components/pages'
import { userContext } from '../contexts'

export default function ConnectedDetail() {
  const dispatch = useDispatch()
  const { userState } = React.useContext(userContext)
  const actions = React.useMemo(
    () => ({
      changeTodo(id: string, newValues: Todo.Values) {
        dispatch(Todos.editAndSync(userState.id, id, newValues))
      },
    }),
    [userState.id, dispatch],
  )

  return <Detail actions={actions} />
}
