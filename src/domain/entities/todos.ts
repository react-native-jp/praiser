import { filter } from '@januswel/object-utilities'

import { assert } from '../../lib/assert'
import * as Todo from './todo'

export interface Model {
  [id: string]: Todo.Model
}

export function factory(newValues: Todo.Values[]): Model {
  return newValues.reduce<Model>((result, newValue) => {
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
  return filter(todos, id => id !== targetId)
}

export function update(todos: Model, id: string, values: Todo.Values): Model {
  assert(id in todos)

  return {
    ...todos,
    [id]: Todo.change(todos[id], values),
  }
}

export function toggle(todos: Model, id: string): Model {
  assert(id in todos)

  return {
    ...todos,
    [id]: Todo.toggle(todos[id]),
  }
}

export function getNumof(todos: Model): number {
  return Object.keys(todos).length
}

export function findByTitle(todos: Model, title: string): Todo.Model[] {
  return Object.values(todos).filter(todo => todo.title === title)
}
