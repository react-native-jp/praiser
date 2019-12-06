import { Todo, Todos } from '../domain/entities'

export function createInitialState(): Todos.Entity {
  return {}
}
export type State = ReturnType<typeof createInitialState>

export const SET = 'todo/set' as const
export const ADD = 'todo/add' as const
export const UPDATE = 'todo/update' as const
export const REMOVE = 'todo/remove' as const
export const TOGGLE = 'todo/toggle' as const

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

type SetAction = ReturnType<typeof set>
type AddAction = ReturnType<typeof add>
type UpdateAction = ReturnType<typeof update>
type RemoveAction = ReturnType<typeof remove>
type ToggleAction = ReturnType<typeof toggle>
export type Action = SetAction | AddAction | UpdateAction | RemoveAction | ToggleAction

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
    default:
      return state
  }
}
