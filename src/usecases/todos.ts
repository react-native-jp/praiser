import { Dispatch } from 'redux'

import { Todo } from '../domain/models'
import * as TodosRepository from '../domain/repositories/todos'
import { add, remove, toggle, update } from '../modules/todos'
import { AppState } from '../modules'

export const addAndSync = (userId: string, newValues: Todo.Values) => (dispatch: Dispatch) => {
  const newTodo = Todo.factory(newValues)
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

export const editTodo = (
  userId: string,
  id: string,
  newValue: {
    title: string
    detail: string
  },
) => (dispatch: Dispatch) => {
  dispatch(update(id, newValue))
  TodosRepository.change(userId, id, newValue)
}
