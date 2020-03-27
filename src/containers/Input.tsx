import React from 'react';
import { useDispatch } from 'react-redux';

import { Todo } from '../domain/models';
import * as Todos from '../usecases/todos';
import { Input } from '../components/pages';
import { UserContext } from '../contexts';

export default function ConnectedInput() {
  const { userState } = React.useContext(UserContext);

  const dispatch = useDispatch();
  const actions = React.useMemo(
    () =>
      userState
        ? {
            addTodo(newValues: Todo.Values) {
              dispatch(Todos.addAndSync(userState.id, newValues));
            },
          }
        : null,
    [userState, dispatch],
  );

  if (!actions) {
    return null;
  }

  return <Input actions={actions} />;
}
