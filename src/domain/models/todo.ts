import 'react-native-get-random-values'
import { v4 as generateUuid } from 'uuid'

import { assertIsDefined } from '../../lib/assert'

export interface Model {
  readonly id: string
  readonly title: string
  readonly detail?: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly completedAt: string | null
}

export interface Values {
  readonly title: string
  readonly detail?: string
}

export function factory(todo: Values): Model {
  assertIsDefined(todo.title)

  const now = new Date().toISOString()
  return {
    id: generateUuid(),
    title: todo.title,
    detail: todo.detail,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  }
}

export function isDone(todo: Model): boolean {
  return todo.completedAt !== null
}

export function change(todo: Model, newValues: Values): Model {
  assertIsDefined(newValues.title)

  const now = new Date().toISOString()
  return {
    ...todo,
    ...newValues,
    updatedAt: now,
  }
}

export function toggle(todo: Model): Model {
  const now = new Date().toISOString()
  return {
    ...todo,
    updatedAt: now,
    completedAt: todo.completedAt === null ? now : null,
  }
}
