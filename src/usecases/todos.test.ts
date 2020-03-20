import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { AppState } from '../modules';
import { ADD, REMOVE, TOGGLE, UPDATE } from '../modules/todos';
import * as Usecases from './todos';

const middlewares = [thunk];
const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, void, AnyAction>>(middlewares);

describe('todos usecases', () => {
  describe('addAndSync', () => {
    it('returns actions', () => {
      const store = mockStore({
        todos: {},
      });

      const action = Usecases.addAndSync('me', { title: 'foo' });
      return store.dispatch(action).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);

        const [dispatchedAction] = dispatchedActions;
        expect(dispatchedAction.type).toBe(ADD);
        expect(dispatchedAction.payload.todo.title).toBe('foo');
      });
    });
  });

  describe('removeAndSync', () => {
    it('returns actions', () => {
      const now = new Date();
      const store = mockStore({
        todos: {
          it: {
            id: 'it',
            title: 'foo',
            detail: 'bar',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            completedAt: null,
          },
        },
      });

      const action = Usecases.removeAndSync('me', 'it');
      return store.dispatch(action).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);

        const [dispatchedAction] = dispatchedActions;
        expect(dispatchedAction.type).toBe(REMOVE);
        expect(dispatchedAction.payload.id).toBe('it');
      });
    });
  });

  describe('toggleAndSync', () => {
    it('returns actions', () => {
      const now = new Date();
      const store = mockStore({
        todos: {
          it: {
            id: 'it',
            title: 'foo',
            detail: 'bar',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            completedAt: null,
          },
        },
      });

      const action = Usecases.toggleAndSync('me', 'it');
      return store.dispatch(action).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);

        const [dispatchedAction] = dispatchedActions;
        expect(dispatchedAction.type).toBe(TOGGLE);
        expect(dispatchedAction.payload.id).toBe('it');
        expect(dispatchedAction.payload.completedAt).not.toBeNull();
      });
    });
  });

  describe('editAndSync', () => {
    it('returns actions', () => {
      const now = new Date();
      const store = mockStore({
        todos: {
          it: {
            id: 'it',
            title: 'foo',
            detail: 'bar',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            completedAt: null,
          },
        },
      });

      const action = Usecases.editAndSync('me', 'it', { title: 'edited' });
      return store.dispatch(action).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);

        const [dispatchedAction] = dispatchedActions;
        expect(dispatchedAction.type).toBe(UPDATE);
        expect(dispatchedAction.payload.id).toBe('it');
        expect(dispatchedAction.payload.todo.title).toBe('edited');
      });
    });
  });
});
