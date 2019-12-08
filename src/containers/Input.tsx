import React from 'react'
import { useDispatch } from 'react-redux'

import { Todo } from '../domain/models'
import * as Todos from '../usecases/todos'
import { Input } from '../components/pages'
import { UserContext } from '../contexts'
import { assertIsDefined } from '../lib/assert'

export default function ConnectedInput() {
  const { userState } = React.useContext(UserContext)
  assertIsDefined(userState)

  const dispatch = useDispatch()
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
