import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import store from './store';
import * as UiContext from './contexts/ui';
import * as NetworkContext from './contexts/network';
import * as UserContext from './contexts/user';
import Routes from './routes';
import NetworkPanel from './components/molecules/NetworkPanel';
import ErrorPanel from './components/molecules/ErrorPanel';

export default function App() {
  const [error, setError] = React.useState(UiContext.createErrorInitialState());
  const [snackbar, setSnackbar] = React.useState(UiContext.createSnackbarInitialState());
  const [applicationState, setApplicationState] = React.useState(UiContext.createApplicationInitialState());
  const onDismiss = React.useCallback(() => {
    setSnackbar(UiContext.createSnackbarInitialState());
  }, []);

  const [networkState, dispatchNetworkActions] = React.useReducer(
    NetworkContext.reducer,
    NetworkContext.createInitialState(),
  );

  const [userState, setUserState] = React.useState(UserContext.createInitialState());

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <UiContext.Context.Provider
          value={{ error, setError, snackbar, setSnackbar, applicationState, setApplicationState }}
        >
          <NetworkContext.Context.Provider value={{ networkState, dispatchNetworkActions }}>
            <UserContext.Context.Provider value={{ userState, setUserState }}>
              <Routes />
              <NetworkPanel />
              <ErrorPanel />
              <Snackbar
                visible={snackbar.visible}
                onDismiss={onDismiss}
                action={{ label: snackbar.label, onPress: onDismiss }}
              >
                {snackbar.message}
              </Snackbar>
            </UserContext.Context.Provider>
          </NetworkContext.Context.Provider>
        </UiContext.Context.Provider>
      </SafeAreaProvider>
    </Provider>
  );
}
