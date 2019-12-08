import { combineReducers } from 'redux'

import * as Todos from './todos'

export function createInitialState() {
  return {
    todos: Todos.createInitialState(),
  }
}

export type AppState = Readonly<ReturnType<typeof createInitialState>>

export default combineReducers<AppState>({
  todos: Todos.default,
})
