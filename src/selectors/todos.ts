import { createSelector } from 'reselect';

import * as Domain from '../domain/models';
import { AppState } from '../modules';
import round from '../lib/round';

function selectTodos(state: AppState) {
  return state.todos;
}

export const getArray = createSelector([selectTodos], todos =>
  Object.values(todos).map(todo => ({
    id: todo.id,
    title: todo.title,
    detail: todo.detail,
    isDone: Domain.Todo.isDone(todo),
    createdAt: new Date(todo.createdAt).getTime(),
    updatedAt: new Date(todo.updatedAt).getTime(),
  })),
);

export const getTodos = createSelector([getArray], todos => todos.sort((a, b) => b.createdAt - a.createdAt));

export const getCompletedAll = createSelector([getArray], todos => todos.filter(todo => todo.isDone));

export const getNumofCompleted = createSelector([getCompletedAll], todos => todos.length);

export const getStatistics = createSelector([getArray, getNumofCompleted], (todos, numofCompleted) => {
  const numofAll = todos.length;
  const numofUncompleted = numofAll - numofCompleted;
  const completedRatio = round(numofCompleted / numofAll, 3);
  const uncompletedRatio = round(1 - completedRatio, 3);

  return {
    numofAll,
    numofCompleted,
    numofUncompleted,
    completedRatio,
    uncompletedRatio,
  };
});

export const getHistories = createSelector([getCompletedAll], todos => todos.sort((a, b) => b.updatedAt - a.updatedAt));
