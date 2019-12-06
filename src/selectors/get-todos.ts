import { createSelector } from 'reselect'
import * as Domain from '../domain/models'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector([getTodos], (todos: Domain.Todos.Model) =>
  Object.values(todos).map(todo => ({
    id: todo.id,
    title: todo.title,
    detail: todo.detail,
    isDone: Domain.Todo.isDone(todo),
  })),
)
