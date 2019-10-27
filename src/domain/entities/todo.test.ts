/* eslint @typescript-eslint/no-magic-numbers: off */

import * as Todo from './todo'

describe('Todo', () => {
  describe('create', () => {
    it('returns Todo instances', () => {
      const timeExpected = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u

      const todo = Todo.create({ title: 'try RNW', detail: 'implement app with react-native-web' })

      expect(todo.id.length).toBe(36)
      expect(todo.title).toBe('try RNW')
      expect(todo.detail).toBe('implement app with react-native-web')
      expect(todo.completedAt).toBe(null)
      expect(todo.createdAt).toEqual(expect.stringMatching(timeExpected))
      expect(() => new Date(todo.createdAt)).not.toThrow()
      expect(todo.updatedAt).toEqual(expect.stringMatching(timeExpected))
      expect(() => new Date(todo.updatedAt)).not.toThrow()
    })
  })

  describe('change', () => {
    it('returns Todo instances that values are changed to specified', () => {
      const todo = Todo.create({ title: 'abcde', detail: '' })
      expect(todo.title).toBe('abcde')

      setTimeout(() => {
        const changed = Todo.change(todo, {
          title: 'changed',
          detail: 'changed',
        })
        expect(changed.title).toBe('changed')
        expect(changed.detail).toBe('changed')
        expect(todo.completedAt).toBe(null)
        expect(changed.createdAt).toBe(todo.createdAt)
        expect(changed.updatedAt).not.toBe(todo.updatedAt)
      }, 0)
    })
  })

  describe('toggle', () => {
    it('returns Todo instances that has inversed value of isDone', () => {
      const todo = Todo.create({ title: 'foo' })
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
