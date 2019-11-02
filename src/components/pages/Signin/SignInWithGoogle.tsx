import * as React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'

import * as TodosRepository from '../../../domain/repositories/todos'
import { Todos } from '../../../domain/entities'
import { HOME } from '../../../constants/path'
import { errorContext, userContext } from '../../../contexts'
import signInWithGoogle from '../../../lib/firebase/sign-in-with-google'
import * as LocalStore from '../../../lib/local-store'
import useNetworker from '../../../lib/hooks/use-networker'
import Button from '../../Button'

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
  },
})

interface Props {
  actions: {
    setTodos: (todos: Todos.Entity) => void
  }
}

export default function SignInWithGoogle(props: Props) {
  const { navigate } = useNavigation()
  const { setError } = React.useContext(errorContext)
  const { setUserState } = React.useContext(userContext)
  const networker = useNetworker()

  const loginWithGoogle = React.useCallback(async () => {
    try {
      await networker(async () => {
        const userInformation = await signInWithGoogle()
        setUserState(userInformation)
        await LocalStore.saveUserInformation(userInformation)
        const todos = await TodosRepository.getAll(userInformation.id)
        props.actions.setTodos(todos)
        await analytics().logLogin({ method: 'Google' })
        navigate(HOME)
      })
    } catch (e) {
      setError(e)
    }
  }, [])
  return <Button onPress={loginWithGoogle} style={styles.button} icon="google" label="Sign In with Google" />
}
