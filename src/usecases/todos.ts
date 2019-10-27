import { Dispatch } from 'redux'

import { Todo } from '../domain/entities'
import * as TodosRepository from '../domain/repositories/todos'
import { add, remove, toggle } from '../modules/todos'
import { AppState } from '../modules'

export const addAndSync = (userId: string, newValues: Todo.Values) => (dispatch: Dispatch) => {
  const newTodo = Todo.create(newValues)
  dispatch(add(newTodo))
  TodosRepository.add(userId, newTodo)
}

export const removeAndSync = (userId: string, id: string) => (dispatch: Dispatch) => {
  dispatch(remove(id))
  TodosRepository.remove(userId, id)
}

export const toggleAndSync = (userId: string, id: string) => (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(toggle(id))
  const newValue = getState().todos[id].completedAt
  TodosRepository.toggle(userId, id, newValue)
}
