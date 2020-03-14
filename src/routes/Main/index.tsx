import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
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
} from '../../constants/path'
import Home from './Home'
import UserInfo from './UserInfo'
import Statistics from './Statistics'
import { ChooseLogin, Initial } from '../../components/pages'
import { Loading, Signin, Signup, Input } from '../../containers'
import { headerStyle, headerTintColor } from '../Header'
import { Drawer } from '../Drawer'
import * as UiContext from '../../contexts/ui'
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { COLOR } from '../../constants/theme'

const CreateDrawer = createDrawerNavigator()
const drawerStyle = {
  backgroundColor: COLOR.MAIN,
}
const drawerContentOptions = {
  activeTintColor: COLOR.PRIMARY,
  inactiveTintColor: COLOR.WHITE,
}
function HomeWithDrawer() {
  return (
    <CreateDrawer.Navigator
      drawerStyle={drawerStyle}
      drawerContentOptions={drawerContentOptions}
      initialRouteName={HOME}
      drawerContent={props => <Drawer {...props} />}
    >
      <CreateDrawer.Screen name={HOME} component={Home} />
      <CreateDrawer.Screen name={USER_INFO} component={UserInfo} />
    </CreateDrawer.Navigator>
  )
}
function StatisticsWithDrawer() {
  return (
    <CreateDrawer.Navigator
      drawerStyle={drawerStyle}
      drawerContentOptions={drawerContentOptions}
      initialRouteName={STATISTICS}
      drawerContent={props => <Drawer {...props} />}
    >
      <CreateDrawer.Screen name={STATISTICS} component={Statistics} />
      <CreateDrawer.Screen name={USER_INFO} component={UserInfo} />
    </CreateDrawer.Navigator>
  )
}
const cardStyle = {
  backgroundColor: COLOR.MAIN,
}
const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes) {
    return ''
  }
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

const CreateBottomTabNavigator = createBottomTabNavigator()
function TabRoutes() {
  return (
    <CreateBottomTabNavigator.Navigator
      tabBarOptions={{
        inactiveTintColor: COLOR.WHITE,
        activeTintColor: COLOR.PRIMARY,
        style: {
          backgroundColor: COLOR.MAIN,
        },
      }}
      screenOptions={(props: any) => {
        const routeName = getActiveRouteName(props.route.state)
        return {
          tabBarVisible: routeName !== USER_INFO,
        }
      }}
    >
      <CreateBottomTabNavigator.Screen name={HOME} component={HomeWithDrawer} />
      <CreateBottomTabNavigator.Screen name={STATISTICS} component={StatisticsWithDrawer} />
    </CreateBottomTabNavigator.Navigator>
  )
}

const Stack = createStackNavigator()
function TabWithModalRoutes() {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={HOME} component={TabRoutes} />
      <Stack.Screen name={INPUT} component={Input} />
    </Stack.Navigator>
  )
}

function ChooseLoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle,
        headerStyle,
        headerTintColor,
      }}
    >
      <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <Stack.Screen name={SIGN_IN} component={Signin} options={{ title: 'Signin' }} />
      <Stack.Screen name={SIGN_UP} component={Signup} options={{ title: 'Signup' }} />
    </Stack.Navigator>
  )
}

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
})

function switchngAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return (
        <Stack.Screen
          name={CHOOSE_LOGIN}
          component={ChooseLoginNavigator}
          options={{ cardStyleInterpolator: forFade }}
        />
      )
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabWithModalRoutes} options={{ cardStyleInterpolator: forFade }} />
    case UiContext.Status.FIRST_OPEN:
    default:
      return <Stack.Screen name={INITIAL} component={Initial} options={{ cardStyleInterpolator: forFade }} />
  }
}
function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context)
  return (
    <Stack.Navigator initialRouteName={LOADING} headerMode="none">
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchngAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Screen name={LOADING} component={Loading} options={{ cardStyleInterpolator: forFade }} />
      )}
    </Stack.Navigator>
  )
}

export default AuthWithRoutes
