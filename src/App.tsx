import * as React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import ErrorContext from './contexts/error'
import NetworkContext, { reducer } from './contexts/network'
import UserContext, { UserInformation } from './contexts/user'
import App from './components/App'
import NetworkPanel from './components/NetworkPanel'
import ErrorPanel from './components/ErrorPanel'

export default () => {
  const [error, setError] = React.useState(null as Error | null)
  const [networkState, dispatchNetworkActions] = React.useReducer(reducer, 0)
  const [userState, setUserState] = React.useState({} as UserInformation)

  return (
    <Provider store={store}>
      <ErrorContext.Provider value={{ error, setError }}>
        <NetworkContext.Provider value={{ networkState, dispatchNetworkActions }}>
          <UserContext.Provider value={{ userState, setUserState }}>
            <App />
            <NetworkPanel />
            <ErrorPanel />
          </UserContext.Provider>
        </NetworkContext.Provider>
      </ErrorContext.Provider>
    </Provider>
  )
}
