import React from 'react'
import { NavigationState } from '@react-navigation/native'
import analytics from '@react-native-firebase/analytics'
import { NavigationContainer } from '@react-navigation/native'

import MainRoutes from './Main'

const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}
const onNavigationStateChange = (routeNameRef: React.MutableRefObject<undefined | string>) => (
  prevState: NavigationState | undefined,
) => {
  const previousRouteName = routeNameRef.current
  const currentRouteName = getActiveRouteName(prevState)

  if (previousRouteName !== currentRouteName) {
    analytics().setCurrentScreen(currentRouteName, currentRouteName)
  }
  routeNameRef.current = currentRouteName
}

export default function LoggingRoutes() {
  const routeNameRef = React.useRef()

  return (
    <NavigationContainer ref={routeNameRef} onStateChange={onNavigationStateChange(routeNameRef)}>
      <MainRoutes />
    </NavigationContainer>
  )
}
