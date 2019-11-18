import { createSelector } from 'reselect'
import { Todos } from '../domain/entities'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector(
  [getTodos],
  (todos: Todos.Entity) => Object.values(todos).map((todo) => ({
    ...todo,
    isDone: !!todo.completedAt,
  })),
)
