import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  CHOOSE_LOGIN,
  HOME,
  INITIAL,
  LOADING,
  SIGN_IN,
  SIGN_UP,
  STATISTICS,
  USER_INFO,
  INPUT,
} from '../../constants/path';
import Home from './Home';
import UserInfo from './UserInfo';
import Statistics from './Statistics';
import { ChooseLogin, Initial } from '../../components/pages';
import { Loading, SignIn, SignUp, Input } from '../../containers';
import { headerStyle, headerTintColor } from '../Header';
import * as UiContext from '../../contexts/ui';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { COLOR } from '../../constants/theme';

const drawerStyle = {
  backgroundColor: COLOR.MAIN,
};
const drawerContentOptions = {
  activeTintColor: COLOR.PRIMARY,
  inactiveTintColor: COLOR.WHITE,
};
const HomeDrawer = createDrawerNavigator();

function HomeWithDrawer() {
  return (
    <HomeDrawer.Navigator drawerStyle={drawerStyle} drawerContentOptions={drawerContentOptions} initialRouteName={HOME}>
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  );
}

const StatisticsDrawer = createDrawerNavigator();
function StatisticsWithDrawer() {
  return (
    <StatisticsDrawer.Navigator drawerStyle={drawerStyle} drawerContentOptions={drawerContentOptions}>
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <StatisticsDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  );
}
const cardStyle = {
  backgroundColor: COLOR.MAIN,
};
const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes) {
    return '';
  }
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: COLOR.WHITE,
        activeTintColor: COLOR.PRIMARY,
        style: {
          backgroundColor: COLOR.MAIN,
        },
      }}
      screenOptions={(props: any) => {
        const routeName = getActiveRouteName(props.route.state);
        return {
          tabBarVisible: routeName !== USER_INFO,
        };
      }}
    >
      <Tab.Screen name={HOME} component={HomeWithDrawer} />
      <Tab.Screen name={STATISTICS} component={StatisticsWithDrawer} />
    </Tab.Navigator>
  );
}

const ModalStack = createStackNavigator();
function TabWithModalRoutes() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        cardStyle,
      }}
    >
      <ModalStack.Screen name={HOME} component={TabRoutes} />
      <ModalStack.Screen name={INPUT} component={Input} />
    </ModalStack.Navigator>
  );
}
const ChooseLoginStack = createStackNavigator();
function ChooseLoginNavigator() {
  return (
    <ChooseLoginStack.Navigator
      screenOptions={{
        cardStyle,
        headerStyle,
        headerTintColor,
      }}
      initialRouteName={CHOOSE_LOGIN}
    >
      <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn} options={{ title: 'SignIn' }} />
      <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp} options={{ title: 'SignUp' }} />
    </ChooseLoginStack.Navigator>
  );
}

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const Stack = createStackNavigator();
function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginNavigator} />;
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabWithModalRoutes} />;
    case UiContext.Status.FIRST_OPEN:
    default:
      return <Stack.Screen name={INITIAL} component={Initial} />;
  }
}
function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context);
  return (
    <Stack.Navigator initialRouteName={LOADING} headerMode="none" screenOptions={{ cardStyleInterpolator: forFade }}>
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchingAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Screen name={LOADING} component={Loading} />
      )}
    </Stack.Navigator>
  );
}

export default AuthWithRoutes;
