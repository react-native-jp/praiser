import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'

import * as TodosRepository from '../../../domain/repositories/todos'
import { Todos } from '../../../domain/entities'
import { HOME } from '../../../constants/path'
import { userContext } from '../../../contexts'
import useTextInput from '../../../lib/hooks/use-TextInput'
import useNetworker from '../../../lib/hooks/use-networker'
import * as LocalStore from '../../../lib/local-store'
import registerUserToFirebase from '../../../lib/firebase/register-user'
import Button from '../../Button'
import TextField from '../../TextField'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  signInButton: {
    backgroundColor: 'green',
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
})

interface Props {
  actions: {
    setTodos: (todos: Todos.Entity) => void
  }
}

function SignUp(props: Props) {
  const { setUserState } = React.useContext(userContext)
  const { navigate } = useNavigation()
  const networker = useNetworker()
  const mailAddress = useTextInput('')
  const password = useTextInput('')

  const registerUser = React.useCallback(async () => {
    await networker(async () => {
      const userInformation = await registerUserToFirebase(mailAddress.value, password.value)
      setUserState(userInformation)
      await LocalStore.saveUserInformation(userInformation)
      const todos = await TodosRepository.getAll(userInformation.id)
      props.actions.setTodos(todos)
      await analytics().logSignUp({ method: 'mail address and password' })
      navigate(HOME)
    })
  }, [mailAddress.value, password.value])

  return (
    <View style={styles.container}>
      <TextField label="email" value={mailAddress.value} onChangeText={mailAddress.onChangeText} style={styles.text} />
      <TextField label="password" value={password.value} onChangeText={password.onChangeText} style={styles.text} />
      <Button onPress={registerUser} style={styles.button} label="Register" />
    </View>
  )
}

export default SignUp
