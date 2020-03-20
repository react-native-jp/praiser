import * as Todos from './todos';
import * as Todo from './todo';

const TODO_VALUES = [
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
];

const ISO8601_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u;

describe('Todos', () => {
  describe('factory', () => {
    it('returns an instance of Todos model', () => {
      const todos = Todos.factory(TODO_VALUES);

      expect(Todos.getNumof(todos)).toBe(3);

      const [actual] = Todos.findByTitle(todos, '1');
      expect(actual.title).toBe('1');
      expect(actual.detail).toBe('sample');
      expect(actual.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(actual.createdAt)).not.toThrow();
      expect(actual.updatedAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(actual.updatedAt)).not.toThrow();
      expect(actual.createdAt).toEqual(actual.updatedAt);
    });
  });

  describe('add', () => {
    it('returns an instance of Todos model that has specified todo', () => {
      const todos = Todos.factory(TODO_VALUES);
      expect(Todos.getNumof(todos)).toBe(3);

      const added = Todos.add(todos, Todo.factory({ title: '4', detail: 'sample' }));
      expect(Todos.getNumof(added)).toBe(4);
      expect(Todos.findByTitle(added, '4').length).toBe(1);
    });
  });

  describe('remove', () => {
    it('returns an instance of Todos model that does not have an instance of Todo model', () => {
      const todos = Todos.factory(TODO_VALUES);
      expect(Todos.getNumof(todos)).toBe(3);

      const [id] = Object.keys(todos);
      const removed = Todos.remove(todos, id);
      expect(Todos.getNumof(removed)).toBe(2);
    });
  });

  describe('update', () => {
    it('returns an instance of Todos model that has changed Todo model with specified values', () => {
      const todos = Todos.factory(TODO_VALUES);
      const [id] = Object.keys(todos);
      const updated = Todos.update(todos, id, {
        title: 'updated',
        detail: undefined,
      });
      expect(updated[id].title).toBe('updated');
      expect(updated[id].detail).toBeUndefined();
      expect(new Date(updated[id].updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(todos[id].updatedAt).getTime());
    });
  });

  describe('toggle', () => {
    it('returns an instance of Todos model that has a Todo model toggled complate status', () => {
      const todos = Todos.factory(TODO_VALUES);
      const [id] = Object.keys(todos);
      const toggled = Todos.toggle(todos, id);
      expect(toggled[id].completedAt).not.toBeNull();
    });
  });
});
