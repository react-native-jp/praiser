import { createSelector } from 'reselect'
import * as Domain from '../domain/entities'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector(
  [getTodos],
  (todos: Domain.Todos.Entity) =>
    Object.values(todos).filter(todo => !Domain.Todo.isDone(todo))
)
