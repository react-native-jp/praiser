import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import analytics from '@react-native-firebase/analytics';

import TextField, { dismiss } from '../../atoms/TextField';
import Button from '../../atoms/Button';
import SignInWithGoogle from './SignInWithGoogle';
import { Status } from '../../../contexts/ui';
import { UiContext, UserContext } from '../../../contexts';
import { Todos } from '../../../domain/models';
import * as TodosRepository from '../../../domain/repositories/todos';
import { useControlledComponent, useNetworker } from '../../../lib/hooks';
import * as LocalStore from '../../../lib/local-store';
import signInWithPasswordToFirebase from '../../../lib/firebase/sign-in-with-password';
import testIDs from '../../../constants/testIDs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignIn(props: Props) {
  const { setUserState } = React.useContext(UserContext);
  const { setApplicationState } = React.useContext(UiContext);
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');
  const { setTodos } = props.actions;

  const signInWithPassword = React.useCallback(async () => {
    await networker(async () => {
      const userInformation = await signInWithPasswordToFirebase(mailAddress.value, password.value);
      setUserState(userInformation);
      setApplicationState(Status.AUTHORIZED);
      await LocalStore.UserInformation.save(userInformation);
      const todos = await TodosRepository.getAll(userInformation.id);
      setTodos(todos);
      await analytics().logLogin({ method: 'mail address and password' });
    });
  }, [mailAddress.value, password.value, setApplicationState, networker, setUserState, setTodos]);

  return (
    <TouchableWithoutFeedback onPress={dismiss} testID={testIDs.SIGN_IN}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextField
            label="email"
            value={mailAddress.value}
            onChangeText={mailAddress.onChangeText}
            style={styles.text}
            autoCompleteType="email"
            testID={testIDs.SIGN_IN_EMAIL}
          />
          <TextField
            label="password"
            value={password.value}
            onChangeText={password.onChangeText}
            style={styles.text}
            autoCompleteType="password"
            secureTextEntry={true}
            testID={testIDs.SIGN_IN_PASSWORD}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SignInWithGoogle {...props} />
          <Button
            onPress={signInWithPassword}
            label="SignIn"
            style={styles.button}
            testID={testIDs.SIGN_IN_EMAIL_BUTTON}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
