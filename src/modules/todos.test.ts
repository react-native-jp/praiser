import { Todo, Todos } from '../domain/models';
import {
  Action,
  ADD,
  REMOVE,
  SET,
  TOGGLE,
  UPDATE,
  add,
  createInitialState,
  default as reducer,
  remove,
  set,
  toggle,
  update,
} from './todos';

describe('todos', () => {
  describe('set', () => {
    it('returns an Action to tell the reducer "set todos"', () => {
      const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
      expect(action.type).toBe(SET);
      expect(Todos.getNumof(action.payload.todos)).toBe(2);
    });
  });

  describe('add', () => {
    it('returns an Action to tell the reducer "add a todo"', () => {
      const action = add(Todo.factory({ title: 'foo', detail: 'bar' }));

      expect(action.type).toBe(ADD);
      expect(action.payload.todo.id.length).toBe(36);
      expect(action.payload.todo.title).toBe('foo');
      expect(action.payload.todo.detail).toBe('bar');
      expect(action.payload.todo.createdAt).toBe(action.payload.todo.updatedAt);
    });
  });

  describe('update', () => {
    it('returns an Action to tell the reducer "update the todo"', () => {
      const action = update('4', { title: 'foo', detail: 'bar' });
      expect(action).toEqual({
        type: UPDATE,
        payload: {
          id: '4',
          todo: {
            title: 'foo',
            detail: 'bar',
          },
        },
      });
    });
  });

  describe('remove', () => {
    it('returns an Action to tell the reducer "remove the todo"', () => {
      const action = remove('0');
      expect(action).toEqual({
        type: REMOVE,
        payload: {
          id: '0',
        },
      });
    });
  });

  describe('toggle', () => {
    it('returns an Action to tell the reducer "toggle completed status of the todo"', () => {
      const action = toggle('42');
      expect(action).toEqual({
        type: TOGGLE,
        payload: {
          id: '42',
        },
      });
    });
  });

  describe('reducer', () => {
    describe('set Action', () => {
      it('returns a new state that has payload of "set Action"', () => {
        const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
        const setState = reducer(undefined, action);
        expect(Todos.getNumof(setState)).toBe(2);
      });
    });

    describe('add Action', () => {
      it('returns a new state that has a instance of Todo model from payload of "add Action"', () => {
        const action = add(Todo.factory({ title: 'foo', detail: 'bar' }));
        const addedState = reducer(createInitialState(), action);
        expect(Todos.getNumof(addedState)).toBe(1);
        const [id] = Object.keys(addedState);
        const addedTodo = addedState[id];
        expect(addedTodo.id.length).toBe(36);
        expect(addedTodo.title).toBe('foo');
        expect(addedTodo.detail).toBe('bar');
        expect(addedTodo.createdAt).toBe(addedTodo.updatedAt);
      });
    });

    describe('update Action', () => {
      it('returns a new state that has the instance of Todo model updated by "update Action"', () => {
        const setAction = set(Todos.factory([{ title: 'foo' }]));
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const updateAction = update(id, { title: 'bar', detail: 'buz' });
        const updatedState = reducer(initialState, updateAction);
        expect(Todos.getNumof(updatedState)).toBe(1);

        const updatedTodo = updatedState[id];
        expect(updatedTodo.title).toBe('bar');
        expect(updatedTodo.detail).toBe('buz');
      });
    });

    describe('remove Action', () => {
      it('returns a new state that does not have the instance of Todo model specified by "remove Action"', () => {
        const setAction = set(Todos.factory([{ title: 'foo' }, { title: 'bar' }]));
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const removeAction = remove(id);
        const removedState = reducer(initialState, removeAction);
        expect(Todos.getNumof(removedState)).toBe(1);
        expect(id in removedState).toBe(false);
      });
    });

    describe('toggle Action', () => {
      it('returns a new state that has the instance of Todo model which is toggled by "toggle Action"', () => {
        const setAction = set(Todos.factory([{ title: 'foo' }, { title: 'bar' }]));
        const initialState = reducer(undefined, setAction);

        const [id] = Object.keys(initialState);
        const toggleAction = toggle(id);
        const toggledState = reducer(initialState, toggleAction);
        expect(Todos.getNumof(toggledState)).toBe(2);

        const toggledTodo = toggledState[id];
        expect(Todo.isDone(toggledTodo)).toBe(true);
      });
    });

    describe('unknown Action', () => {
      it('returns old state', () => {
        const action = ({ type: 'unknown' } as unknown) as Action;
        const initialState = createInitialState();
        const state = reducer(initialState, action);
        expect(state).toBe(initialState);
      });
    });
  });
});
