import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import * as TodosRepository from '../../../domain/repositories/todos'
import { Todos } from '../../../domain/entities'
import { HOME } from '../../../constants/path'
import { errorContext, userContext } from '../../../contexts'
import signInWithGoogle from '../../../lib/firebase/sign-in-with-google'
import * as LocalStore from '../../../lib/local-store'
import useNetworker from '../../../lib/hooks/use-networker'

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
        navigate(HOME)
      })
    } catch (e) {
      setError(e)
    }
  }, [])

  return (
    <TouchableOpacity onPress={loginWithGoogle} style={styles.button}>
      <Image source={require('../../../../assets/signin-with-google.png')} />
      <Text style={styles.label}>Sign In with Google</Text>
    </TouchableOpacity>
  )
}
