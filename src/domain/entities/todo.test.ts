import * as Todo from './todo'

const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u

describe('Todo', () => {
  describe('factory', () => {
    it('returns Todo instances', () => {
      const todo = Todo.factory({
        title: 'Try building apps with React Native',
        detail: 'Build Hello World app',
      })

      expect(todo.id.length).toBe(36)
      expect(todo.title).toBe('Try building apps with React Native')
      expect(todo.detail).toBe('Build Hello World app')
      expect(todo.completedAt).toBeNull()
      expect(todo.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN))
      expect(() => new Date(todo.createdAt)).not.toThrow()
      expect(todo.updatedAt).toEqual(expect.stringMatching(ISO8601_PATTERN))
      expect(() => new Date(todo.updatedAt)).not.toThrow()
      expect(todo.createdAt).toEqual(todo.updatedAt)
    })
  })

  describe('isDone', () => {
    it('returns true when todo is completed', () => {
      const uncompleted = Todo.factory({
        title: 'sample todo',
      })
      expect(Todo.isDone(uncompleted)).toBe(false)
      const completed = Todo.toggle(uncompleted)
      expect(Todo.isDone(completed)).toBe(true)
    })
  })

  describe('change', () => {
    it('returns Todo instances that have specified titles and details', () => {
      const todo = Todo.factory({ title: 'abcde' })
      expect(todo.title).toBe('abcde')
      expect(todo.detail).toBeUndefined()

      const changed = Todo.change(todo, {
        title: 'changed',
        detail: 'changed',
      })
      expect(changed.title).toBe('changed')
      expect(changed.detail).toBe('changed')
      expect(todo.completedAt).toBeNull()
      expect(changed.createdAt).toBe(todo.createdAt)
      expect(changed.updatedAt).not.toBe(todo.updatedAt)
      expect(new Date(changed.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(changed.createdAt).getTime())
    })
  })

  describe('toggle', () => {
    it('returns Todo instances that has inversed value of isDone', () => {
      const todo = Todo.factory({ title: 'foo' })
      const toggled = Todo.toggle(todo)

      expect(toggled.title).toBe('foo')
      expect(toggled.detail).toBeUndefined()
      expect(toggled.completedAt).not.toBeNull()
      expect(toggled.createdAt).toBe(todo.createdAt)
      expect(new Date(toggled.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(todo.updatedAt).getTime())

      const undoed = Todo.toggle(toggled)
      expect(undoed.title).toBe('foo')
      expect(undoed.detail).toBeUndefined()
      expect(undoed.completedAt).toBeNull()
      expect(undoed.createdAt).toBe(todo.createdAt)
      expect(new Date(undoed.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(toggled.updatedAt).getTime())
    })
  })
})
