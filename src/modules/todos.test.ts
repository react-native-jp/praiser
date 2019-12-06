import { Todo, Todos } from '../domain/models'
import { ADD, REMOVE, SET, UPDATE, add, remove, set, update } from './todos'

describe('todos', () => {
  it('returns an Action to tell the reducer "set todos"', () => {
    const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]))
    expect(action.type).toBe(SET)
    expect(Todos.getNumof(action.payload.todos)).toBe(2)
  })

  it('returns an Action to tell the reducer"add a todo"', () => {
    const action = add(Todo.factory({ title: 'foo', detail: 'bar' }))

    expect(action.type).toBe(ADD)
    expect(action.payload.todo.id.length).toBe(36)
    expect(action.payload.todo.title).toBe('foo')
    expect(action.payload.todo.detail).toBe('bar')
    expect(action.payload.todo.createdAt).toBe(action.payload.todo.updatedAt)
  })

  it('returns an Action to tell the reducer "update the todo"', () => {
    const action = update('4', { title: 'foo', detail: 'bar' })
    expect(action).toEqual({
      type: UPDATE,
      payload: {
        id: '4',
        todo: {
          title: 'foo',
          detail: 'bar',
        },
      },
    })
  })

  it('returns an Action to tell the reducer "remove the todo"', () => {
    const action = remove('0')
    expect(action).toEqual({
      type: REMOVE,
      payload: {
        id: '0',
      },
    })
  })
})
