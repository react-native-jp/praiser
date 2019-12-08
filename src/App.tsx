import React from 'react'
import { Provider } from 'react-redux'
import { Snackbar } from 'react-native-paper'

import store from './store'
import * as UiContext from './contexts/ui'
import * as NetworkContext from './contexts/network'
import * as UserContext from './contexts/user'
import Routes from './routes'
import NetworkPanel from './components/NetworkPanel'
import ErrorPanel from './components/ErrorPanel'

export default function App() {
  const [error, setError] = React.useState(UiContext.createErrorInitialState())
  const [networkState, dispatchNetworkActions] = React.useReducer(
    NetworkContext.reducer,
    NetworkContext.createInitialState(),
  )
  const [userState, setUserState] = React.useState(UserContext.createInitialState())
  const [snackBar, setSnackBar] = React.useState(UiContext.createSnackBarInitialState())
  const onDismiss = React.useCallback(() => {
    setSnackBar(UiContext.createSnackBarInitialState())
  }, [])

  return (
    <Provider store={store}>
      <UiContext.Context.Provider value={{ error, setError, snackBar, setSnackBar }}>
        <NetworkContext.Context.Provider value={{ networkState, dispatchNetworkActions }}>
          <UserContext.Context.Provider value={{ userState, setUserState }}>
            <Routes />
            <NetworkPanel />
            <ErrorPanel />
            <Snackbar
              visible={snackBar.visible}
              onDismiss={onDismiss}
              action={{ label: snackBar.label, onPress: onDismiss }}
            >
              {snackBar.message}
            </Snackbar>
          </UserContext.Context.Provider>
        </NetworkContext.Context.Provider>
      </UiContext.Context.Provider>
    </Provider>
  )
}
