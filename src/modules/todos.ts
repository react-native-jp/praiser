import { Todo, Todos } from '../domain/models'

export function createInitialState(): Todos.Model {
  return Todos.factory()
}
export type State = ReturnType<typeof createInitialState>

export const SET = 'todo/set' as const
export const ADD = 'todo/add' as const
export const UPDATE = 'todo/update' as const
export const REMOVE = 'todo/remove' as const
export const TOGGLE = 'todo/toggle' as const

export function set(todos: Todos.Model) {
  return {
    type: SET,
    payload: {
      todos,
    },
  }
}

export function add(todo: Todo.Model) {
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

export type Action =
  | ReturnType<typeof set>
  | ReturnType<typeof add>
  | ReturnType<typeof update>
  | ReturnType<typeof remove>
  | ReturnType<typeof toggle>

export default function reducer(state = createInitialState(), action: Action) {
  switch (action.type) {
    case SET:
      return action.payload.todos
    case ADD:
      return Todos.add(state, action.payload.todo)
    case UPDATE: {
      const { payload } = action
      return Todos.update(state, payload.id, payload.todo)
    }
    case REMOVE:
      return Todos.remove(state, action.payload.id)
    case TOGGLE:
      return Todos.toggle(state, action.payload.id)
  }
}
