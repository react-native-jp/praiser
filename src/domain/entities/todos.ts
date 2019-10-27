import * as Todo from './todo'

export interface Entity {
  [id: string]: Todo.Entity
}

export function factory(newValues: Todo.Values[]): Entity {
  return newValues.reduce((result: Entity, newValue: Todo.Values) => {
    const newTodo = Todo.create(newValue)
    result[newTodo.id] = newTodo
    return result
  }, {})
}

export function add(todos: Entity, newTodo: Todo.Entity): Entity {
  return {
    ...todos,
    [newTodo.id]: newTodo,
  }
}

export function remove(todos: Entity, targetId: string): Entity {
  return Object.keys(todos)
    .filter(id => id !== targetId)
    .reduce((result: Entity, id) => {
      result[id] = todos[id]
      return result
    }, {})
}

export function update(todos: Entity, id: string, values: Todo.Values): Entity {
  if (!(id in todos)) {
    throw new Error(`todo with specified id ${id} is not found`)
  }

  return {
    ...todos,
    [id]: Todo.change(todos[id], values),
  }
}

export function toggle(todos: Entity, id: string): Entity {
  if (!(id in todos)) {
    throw new Error(`todo with specified id ${id} is not found`)
  }

  return {
    ...todos,
    [id]: Todo.toggle(todos[id]),
  }
}
