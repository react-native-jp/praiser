import { createSelector } from 'reselect'
import * as Domain from '../domain/entities'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector(
  [getTodos],
  (todos: Domain.Todos.Entity) =>
    Object.values(todos).map(todo => ({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
      isDone: Domain.Todo.isDone(todo),
    })),
)