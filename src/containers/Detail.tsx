import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Detail } from '../components/pages'
import { UserContext } from '../contexts'
import { assertIsDefined } from '../lib/assert'

export default function ConnectedDetail() {
  const { userState } = React.useContext(UserContext)
  assertIsDefined(userState)

  const dispatch = useDispatch()
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
