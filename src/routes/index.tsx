import React from 'react';
import analytics from '@react-native-firebase/analytics';
import { NavigationState, NavigationContainer } from '@react-navigation/native';
import { PartialState } from '@react-navigation/routers';

import MainRoutes from './Main';

function isNavigationState(state: NavigationState | PartialState<NavigationState>): state is NavigationState {
  return 'index' in state;
}

const getActiveRouteName = (state: NavigationState): string => {
  const route = state.routes[state.index];

  const { state: childState } = route;
  if (childState && isNavigationState(childState)) {
    // Dive into nested navigators
    return getActiveRouteName(childState);
  }

  return route.name;
};

function isDefined(state: NavigationState | undefined): state is NavigationState {
  return state !== undefined;
}

const onNavigationStateChange = (routeNameRef: React.MutableRefObject<undefined | string>) => (
  prevState: NavigationState | undefined,
) => {
  if (!isDefined(prevState)) {
    return;
  }

  const previousRouteName = routeNameRef.current;
  const currentRouteName = getActiveRouteName(prevState);

  if (previousRouteName !== currentRouteName) {
    analytics().setCurrentScreen(currentRouteName, currentRouteName);
  }
  routeNameRef.current = currentRouteName;
};

export default function LoggingRoutes() {
  const routeNameRef = React.useRef();

  return (
    <NavigationContainer ref={routeNameRef} onStateChange={onNavigationStateChange(routeNameRef)}>
      <MainRoutes />
    </NavigationContainer>
  );
}
