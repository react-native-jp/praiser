import generateUuid from 'uuid/v4'

export interface Entity {
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

export function create(todo: Values): Entity {
  if (!todo.title) {
    throw new Error('title is required')
  }

  const now = new Date()
  return {
    id: generateUuid(),
    title: todo.title,
    detail: todo.detail,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    completedAt: null,
  }
}

export function change(todo: Entity, newValues: Values): Entity {
  if (!newValues.title) {
    throw new Error('title is required')
  }

  const now = new Date()
  return {
    ...todo,
    ...newValues,
    updatedAt: now.toISOString(),
  }
}

export function toggle(todo: Entity): Entity {
  const now = new Date()
  return {
    ...todo,
    updatedAt: now.toISOString(),
    completedAt: todo.completedAt === null ? now.toISOString() : null,
  }
}
