import { createSelector } from 'reselect'
import { Todos } from '../domain/entities'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector(
  [getTodos],
  (todos: Todos.Entity) => {
    const all = Object.values(todos)
    const numofAll = all.length
    const numofCompleted = all.filter(todo => todo.completedAt != null).length
    return {
      numofCompleted,
      numofUncompleted: numofAll - numofCompleted,
      numofAll,
    }
  },
)
