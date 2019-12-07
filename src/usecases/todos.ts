import { Dispatch } from 'redux'

import { Todo } from '../domain/models'
import * as TodosRepository from '../domain/repositories/todos'
import { AppState } from '../modules'
import { add, remove, toggle, update } from '../modules/todos'

export function addAndSync(userId: string, newValues: Todo.Values) {
  return function(dispatch: Dispatch) {
    const newTodo = Todo.factory(newValues)
    dispatch(add(newTodo))
    TodosRepository.add(userId, newTodo)
  }
}

export function removeAndSync(userId: string, id: string) {
  return function(dispatch: Dispatch) {
    dispatch(remove(id))
    TodosRepository.remove(userId, id)
  }
}

export function toggleAndSync(userId: string, id: string) {
  return function(dispatch: Dispatch, getState: () => AppState) {
    dispatch(toggle(id))
    const newValue = getState().todos[id].completedAt
    TodosRepository.toggle(userId, id, newValue)
  }
}

export function editTodo(userId: string, id: string, newValues: Todo.Values) {
  return function(dispatch: Dispatch) {
    dispatch(update(id, newValues))
    TodosRepository.change(userId, id, newValues)
  }
}
