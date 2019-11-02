import createReducer from './create-reducer'
import { Todo, Todos } from '../domain/entities'

export const SET = 'todo/set' as const
export const ADD = 'todo/add' as const
export const UPDATE = 'todo/update' as const
export const REMOVE = 'todo/remove' as const
export const TOGGLE = 'todo/toggle' as const

export const createInitialState = () => ({} as Todos.Entity)
export type State = ReturnType<typeof createInitialState>

export function set(todos: Todos.Entity) {
  return {
    type: SET,
    payload: {
      todos,
    },
  }
}

export function add(todo: Todo.Entity) {
  return {
    type: ADD,
    payload: {
      todo,
    },
  }
}

export function update(id: string, todo: Todo.Values) {
  return {
    type: UPDATE,
    payload: {
      id,
      todo,
    },
  }
}

export function remove(id: string) {
  return {
    type: REMOVE,
    payload: {
      id,
    },
  }
}

export function toggle(id: string) {
  return {
    type: TOGGLE,
    payload: {
      id,
    },
  }
}

export type Actions =
  | ReturnType<typeof set>
  | ReturnType<typeof add>
  | ReturnType<typeof update>
  | ReturnType<typeof remove>
  | ReturnType<typeof toggle>

export default createReducer(createInitialState(), {
  [SET]: (_state, action) => action.payload.todos,
  [ADD]: (state, action) => Todos.add(state, action.payload.todo),
  [UPDATE]: (state, action) => Todos.update(state, action.payload.id, action.payload.todo),
  [REMOVE]: (state, action) => Todos.remove(state, action.payload.id),
  [TOGGLE]: (state, action) => Todos.toggle(state, action.payload.id),
})
