import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import testIDs from '../../../constants/testIDs';
import { UiContext, UserContext } from '../../../contexts';
import { Status } from '../../../contexts/ui';
import { Todos } from '../../../domain/models';
import * as TodosRepository from '../../../domain/repositories/todos';
import { useControlledComponent } from '../../../lib/hooks';
import useNetworker from '../../../lib/hooks/use-networker';
import * as LocalStore from '../../../lib/local-store';
import registerUserToFirebase from '../../../lib/firebase/register-user';
import Button from '../../atoms/Button';
import TextField, { dismiss } from '../../atoms/TextField';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignUp(props: Props) {
  const { setUserState } = React.useContext(UserContext);
  const { setApplicationState } = React.useContext(UiContext);
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');

  const registerUser = React.useCallback(async () => {
    await networker(async () => {
      const userInformation = await registerUserToFirebase(mailAddress.value, password.value);
      setUserState(userInformation);
      setApplicationState(Status.AUTHORIZED);
      await LocalStore.UserInformation.save(userInformation);
      const todos = await TodosRepository.getAll(userInformation.id);
      props.actions.setTodos(todos);
      await analytics().logSignUp({ method: 'mail address and password' });
    });
  }, [setApplicationState, mailAddress.value, networker, password.value, props.actions, setUserState]);

  return (
    <TouchableWithoutFeedback onPress={dismiss} testID={testIDs.SIGN_UP}>
      <View style={styles.container}>
        <TextField
          label="email"
          value={mailAddress.value}
          onChangeText={mailAddress.onChangeText}
          style={styles.text}
          autoCompleteType="email"
          testID={testIDs.SIGN_UP_EMAIL}
        />
        <TextField
          label="password"
          value={password.value}
          onChangeText={password.onChangeText}
          style={styles.text}
          autoCompleteType="password"
          secureTextEntry={true}
          testID={testIDs.SIGN_UP_PASSWORD}
        />
        <Button
          onPress={registerUser}
          style={styles.button}
          label="Register"
          testID={testIDs.SIGN_UP_REGISTER_BUTTON}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
