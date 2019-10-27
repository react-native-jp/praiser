/* eslint @typescript-eslint/no-magic-numbers: off */

import * as Todo from './todo'
import * as Todos from './todos'

const TODOS = Todos.factory([
  {
    title: '1',
    detail: 'sample',
  },
  {
    title: '2',
    detail: 'sample',
  },
  {
    title: '3',
    detail: 'sample',
  },
])

describe('Todos', () => {
  describe('factory', () => {
    it('returns Object instance that has keys as id and Todos as value', () => {
      const timeExpected = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u

      expect(Object.keys(TODOS).length).toBe(3)

      const [actual] = Object.values(TODOS).filter(TODO => TODO.title === '1')
      expect(actual.title).toBe('1')
      expect(actual.detail).toBe('sample')
      expect(actual.createdAt).toEqual(expect.stringMatching(timeExpected))
      expect(() => new Date(actual.createdAt)).not.toThrow()
      expect(actual.updatedAt).toEqual(expect.stringMatching(timeExpected))
      expect(() => new Date(actual.updatedAt)).not.toThrow()
    })
  })

  describe('add', () => {
    it('returns Object that has specified one', () => {
      expect(Object.keys(TODOS).length).toBe(3)
      const added = Todos.add(TODOS, Todo.create({ title: '4', detail: 'sample' }))
      expect(Object.keys(added).length).toBe(4)
    })
  })

  describe('remove', () => {
    it('returns array that todo with specified id is removed', () => {
      const [{ id }] = Object.values(TODOS).filter(TODO => TODO.title === '1')
      expect(Object.keys(TODOS).length).toBe(3)
      const removed = Todos.remove(TODOS, id)
      expect(Object.keys(removed).length).toBe(2)
    })
  })

  describe('update', () => {
    it('returns Object that has changed attributes with specified values', () => {
      const [{ id }] = Object.values(TODOS).filter(TODO => TODO.title === '1')
      const updated = Todos.update(TODOS, id, {
        title: 'updated',
        detail: TODOS[id].detail,
      })
      expect(updated[id].title).toBe('updated')
      expect(updated[id].detail).toBe('sample')
      expect(updated[id].updatedAt).not.toBe(TODOS[id].updatedAt)
    })
    it('throws error if specified id is not found', () => {
      expect(() => {
        Todos.update(TODOS, '11', { title: 'this throw errors', detail: '' })
      }).toThrow()
    })
  })

  describe('toggle', () => {
    it('returns Object that has todo toggled completedAt', () => {
      const [{ id }] = Object.values(TODOS).filter(TODO => TODO.title === '1')
      const toggled = Todos.toggle(TODOS, id)
      expect(toggled[id].completedAt).not.toBeNull()
    })
    it('throws error if specified id is not found', () => {
      expect(() => {
        Todos.toggle(TODOS, 'abc')
      }).toThrow()
    })
  })
})
