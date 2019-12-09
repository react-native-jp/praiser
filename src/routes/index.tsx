import React from 'react'
import { NavigationAction, NavigationState } from 'react-navigation'
import analytics from '@react-native-firebase/analytics'

import MainRoutes from './Main'

function getActiveRouteName(navigationState: NavigationState): string {
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

function onNavigationStateChange(prevState: NavigationState, currentState: NavigationState, _: NavigationAction) {
  const prevScreen = getActiveRouteName(prevState)
  const currentScreen = getActiveRouteName(currentState)

  if (prevScreen !== currentScreen) {
    analytics().setCurrentScreen(currentScreen, currentScreen)
  }
}

export default function LoggingRoutes() {
  return <MainRoutes onNavigationStateChange={onNavigationStateChange} />
}
