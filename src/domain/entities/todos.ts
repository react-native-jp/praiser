import * as Todo from './todo'

export interface Model {
  [id: string]: Todo.Model
}

export function factory(newValues: Todo.Values[]): Model {
  return newValues.reduce((result: Model, newValue: Todo.Values) => {
    const newTodo = Todo.factory(newValue)
    result[newTodo.id] = newTodo
    return result
  }, {})
}

export function add(todos: Model, newTodo: Todo.Model): Model {
  return {
    ...todos,
    [newTodo.id]: newTodo,
  }
}

export function remove(todos: Model, targetId: string): Model {
  return Object.keys(todos)
    .filter(id => id !== targetId)
    .reduce((result: Model, id) => {
      result[id] = todos[id]
      return result
    }, {})
}

export function update(todos: Model, id: string, values: Todo.Values): Model {
  if (!(id in todos)) {
    throw new Error(`todo with specified id ${id} is not found`)
  }

  return {
    ...todos,
    [id]: Todo.change(todos[id], values),
  }
}

export function toggle(todos: Model, id: string): Model {
  if (!(id in todos)) {
    throw new Error(`todo with specified id ${id} is not found`)
  }

  return {
    ...todos,
    [id]: Todo.toggle(todos[id]),
  }
}
