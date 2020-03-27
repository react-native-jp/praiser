import React from 'react';
import analytics from '@react-native-firebase/analytics';
import { UiContext, UserContext } from '../../../contexts';
import { Status } from '../../../contexts/ui';
import { Todos } from '../../../domain/models';
import * as TodosRepository from '../../../domain/repositories/todos';
import signInWithGoogle from '../../../lib/firebase/sign-in-with-google';
import * as LocalStore from '../../../lib/local-store';
import useNetworker from '../../../lib/hooks/use-networker';
import Button from '../../atoms/Button';
import testIDs from '../../../constants/testIDs';

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignInWithGoogle(props: Props) {
  const { setError, setApplicationState } = React.useContext(UiContext);
  const { setUserState } = React.useContext(UserContext);
  const { setTodos } = props.actions;
  const networker = useNetworker();

  const loginWithGoogle = React.useCallback(async () => {
    try {
      await networker(async () => {
        const userInformation = await signInWithGoogle();
        setUserState(userInformation);
        setApplicationState(Status.AUTHORIZED);
        await LocalStore.UserInformation.save(userInformation);
        const todos = await TodosRepository.getAll(userInformation.id);
        setTodos(todos);
        await analytics().logLogin({ method: 'Google' });
      });
    } catch (e) {
      setError(e);
    }
  }, [setApplicationState, networker, setTodos, setUserState, setError]);
  return (
    <Button
      onPress={loginWithGoogle}
      icon="google"
      label="Sign In with Google"
      testID={testIDs.SIGN_IN_WITH_GOOGLE_BUTTON}
    />
  );
}
