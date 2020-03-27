import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../domain/models';
import * as Todos from '../usecases/todos';
import { Detail } from '../components/pages';
import { UserContext } from '../contexts';

export default function ConnectedDetail() {
  const { userState } = React.useContext(UserContext);
  const dispatch = useDispatch();

  const actions = React.useMemo(
    () =>
      userState
        ? {
            changeTodo(id: string, newValues: Todo.Values) {
              dispatch(Todos.editAndSync(userState.id, id, newValues));
            },
          }
        : null,
    [userState, dispatch],
  );

  if (!actions) {
    return null;
  }

  return <Detail actions={actions} />;
}
