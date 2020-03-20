import React from 'react';
import { useDispatch } from 'react-redux';
import { Todos } from '../domain/models';
import { set } from '../modules/todos';
import { SignIn } from '../components/pages';

export default function ConnectedSignIn() {
  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      setTodos(newValues: Todos.Model) {
        dispatch(set(newValues));
      },
    }),
    [dispatch],
  );

  return <SignIn actions={actions} />;
}
