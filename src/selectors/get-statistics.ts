import { createSelector } from 'reselect'
import { Todos } from '../domain/entities'

import { AppState } from '../modules'

const getTodos = (state: AppState) => state.todos

export default createSelector([getTodos], (todos: Todos.Model) => {
  const all = Object.values(todos)
  const numofAll = all.length
  const numofCompleted = all.filter(todo => todo.completedAt != null).length
  const numofUncompleted = numofAll - numofCompleted
  const completedRatio = Math.round((numofCompleted / numofAll) * 100) / 100
  const uncompletedRatio = Math.round((numofUncompleted / numofAll) * 100) / 100

  return {
    numofCompleted,
    numofAll,
    numofUncompleted,
    completedRatio,
    uncompletedRatio,
  }
})
