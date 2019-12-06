import * as React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { firebase } from '@react-native-firebase/auth'
import { HOME, INITIAL, CHOOSE_LOGIN } from '../../../constants/path'
import userContext from '../../../contexts/user'
import uiContext from '../../../contexts/ui'
import * as LocalStore from '../../../lib/local-store'
import { Todos } from '../../../domain/entities'
import * as TodosRepository from '../../../domain/repositories/todos'

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
  const { setUserState } = React.useContext(userContext)
  const { setError } = React.useContext(uiContext)
  const { setTodos } = props.actions

  React.useEffect(() => {
    LocalStore.retrieveUserInformation()
      .then(userInformation => {
        if (!userInformation) {
          LocalStore.isOpendFirstLaunch()
            .then(isOpened => {
              if (!isOpened) {
                navigate(INITIAL)
              } else {
                navigate(CHOOSE_LOGIN)
              }
            })
            .catch(e => {
              return Promise.reject(new Error(e))
            })
          return Promise.resolve()
        }

        setUserState(userInformation)

        return new Promise((resolve, reject) => {
          firebase.auth().onAuthStateChanged(user => {
            if (user == null) {
              return
            }

            TodosRepository.getAll(user.uid)
              .then(todos => {
                setTodos(todos)
                navigate(HOME)
                resolve()
              })
              .catch(e => {
                reject(e)
              })
          })
        })
      })
      .catch(e => {
        setError(e)
      })
  }, [navigate, setTodos, setError, setUserState])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}
