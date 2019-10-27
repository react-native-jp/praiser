import { combineReducers } from 'redux'

import todoReducer, { createInitialState as createTodoInitialState } from './todos'

export interface AppState {
  readonly todos: ReturnType<typeof createTodoInitialState>
}
export const createInitialState = (): AppState => ({
  todos: createTodoInitialState(),
})

export default combineReducers<AppState>({
  todos: todoReducer,
})
