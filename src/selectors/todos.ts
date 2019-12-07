import { createSelector } from 'reselect'

import * as Domain from '../domain/models'
import { AppState } from '../modules'
import round from '../lib/round'

function selectTodos(state: AppState) {
  return state.todos
}

interface Todo {
  id: string
  title: string
  detail: string | undefined
  isDone: boolean
  createdAt: number
  updatedAt: number
}

export const getArray = createSelector([selectTodos], (todos: Domain.Todos.Model) =>
  Object.values(todos).map(todo => ({
    id: todo.id,
    title: todo.title,
    detail: todo.detail,
    isDone: Domain.Todo.isDone(todo),
    createdAt: new Date(todo.createdAt).getTime(),
    updatedAt: new Date(todo.updatedAt).getTime(),
  })),
)

export const getTodos = createSelector([getArray], (todos: Todo[]) => todos.sort((a, b) => b.createdAt - a.createdAt))

export const getCompletedAll = createSelector([getArray], (todos: Todo[]) => todos.filter(todo => todo.isDone))

export const getNumofCompleted = createSelector([getCompletedAll], (todos: Todo[]) => todos.length)

export const getStatistics = createSelector([getArray, getNumofCompleted], (todos: Todo[], numofCompleted: number) => {
  const numofAll = todos.length
  const numofUncompleted = numofAll - numofCompleted
  const completedRatio = round(numofCompleted / numofAll, 2)
  const uncompletedRatio = 1 - completedRatio

  return {
    numofAll,
    numofCompleted,
    numofUncompleted,
    completedRatio,
    uncompletedRatio,
  }
})

export const getHistories = createSelector([getCompletedAll], (todos: Todo[]) =>
  todos.sort((a, b) => b.updatedAt - a.updatedAt),
)
