import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { UiContext, UserContext } from '../../../contexts'
import { Status } from '../../../contexts/ui'
import { Todos } from '../../../domain/models'
import * as TodosRepository from '../../../domain/repositories/todos'
import * as LocalStore from '../../../lib/local-store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void
  }
}

export default function Index(props: Props) {
  const { navigate } = useNavigation()
  const { setUserState } = React.useContext(UserContext)
  const { setError, setApplicationState } = React.useContext(UiContext)
  const { setTodos } = props.actions

  async function navigateNextScreen() {
    const isOpened = await LocalStore.InitialLaunch.isInitialLaunch()
    if (!isOpened) {
      setApplicationState(Status.FIRST_OPEN)
      return
    }
    setApplicationState(Status.UN_AUTHORIZED)
  }

  function initialiseFirebaseAuthentication() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          setApplicationState(Status.UN_AUTHORIZED)
          return
        }

        TodosRepository.getAll(user.uid)
          .then(todos => {
            setTodos(todos)
            setApplicationState(Status.AUTHORIZED)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    })
  }

  async function retrieveUserInformation() {
    try {
      const userInformation = await LocalStore.UserInformation.retrieve()

      if (!userInformation) {
        await navigateNextScreen()
        return
      }

      setUserState(userInformation)
      await initialiseFirebaseAuthentication()
    } catch (e) {
      setError(e)
    }
  }

  React.useEffect(() => {
    retrieveUserInformation()
  }, [navigate, setTodos, setError, setUserState])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}
