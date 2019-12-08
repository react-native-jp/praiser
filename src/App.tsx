import React from 'react'
import { Provider } from 'react-redux'
import { Snackbar } from 'react-native-paper'
import store from './store'
import UiContext, { snackBarInitialState } from './contexts/ui'
import NetworkContext, { reducer } from './contexts/network'
import UserContext, { UserInformation } from './contexts/user'
import App from './components/App'
import NetworkPanel from './components/NetworkPanel'
import ErrorPanel from './components/ErrorPanel'

export default () => {
  const [error, setError] = React.useState(null as Error | null)
  const [snackBar, setSnackBar] = React.useState(snackBarInitialState)
  const onDismiss = React.useCallback(() => {
    setSnackBar({
      visible: false,
      message: '',
      label: 'Done',
    })
  }, [])
  const [networkState, dispatchNetworkActions] = React.useReducer(reducer, 0)
  const [userState, setUserState] = React.useState({} as UserInformation)
  return (
    <Provider store={store}>
      <UiContext.Provider value={{ error, setError, snackBar, setSnackBar }}>
        <NetworkContext.Provider value={{ networkState, dispatchNetworkActions }}>
          <UserContext.Provider value={{ userState, setUserState }}>
            <App />
            <NetworkPanel />
            <ErrorPanel />
            <Snackbar
              visible={snackBar.visible}
              onDismiss={onDismiss}
              action={{ label: snackBar.label, onPress: onDismiss }}
            >
              {snackBar.message}
            </Snackbar>
          </UserContext.Provider>
        </NetworkContext.Provider>
      </UiContext.Provider>
    </Provider>
  )
}
