import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
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
import { TabBar } from '../TabBar'
import { createStackNavigator } from 'react-navigation-stack'
import { COLOR } from '../../constants'

const makeWithDrawerRouter = (routeObject: object) =>
  createDrawerNavigator(
    {
      ...routeObject,
      [USER_INFO]: {
        screen: UserInfo,
      },
    },
    {
      contentComponent: Drawer,
      drawerBackgroundColor: COLOR.MAIN,
      contentOptions: {
        activeTintColor: COLOR.PRIMARY,
        inactiveTintColor: COLOR.WHITE,
      },
    },
  )

const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const TabRoutes = createBottomTabNavigator(
  {
    [HOME]: makeWithDrawerRouter({ [HOME]: Home }),
    [STATISTICS]: makeWithDrawerRouter({ [STATISTICS]: Statistics }),
  },
  {
    defaultNavigationOptions: ({ navigation: { state } }: any) => {
      const { index, routes } = state
      return {
        tabBarVisible: routes[index].routeName !== USER_INFO,
        tabBarOptions: {
          inactiveBackgroundColor: COLOR.MAIN,
          activeBackgroundColor: COLOR.MAIN,
          activeTintColor: COLOR.PRIMARY,
          inactiveTintColor: COLOR.WHITE,
          safeAreaInset: { bottom: 0, top: 0 },
        },
        tabBarComponent: TabBar,
      }
    },
  },
)

const TabWithModalRoutes = createStackNavigator(
  {
    [HOME]: TabRoutes,
    [INPUT]: Input,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
)

const ChooseLoginNavigator = createStackNavigator(
  {
    [CHOOSE_LOGIN]: {
      screen: ChooseLogin,
      navigationOptions: {
        header: null,
      },
    },
    [SIGN_IN]: {
      screen: Signin,
      navigationOptions: {
        title: 'Signin',
      },
    },
    [SIGN_UP]: {
      screen: Signup,
      navigationOptions: {
        title: 'Signup',
      },
    },
  },
  {
    cardStyle,
    defaultNavigationOptions: {
      headerStyle,
      headerTintColor,
    },
  },
)

const AuthWithRoutes = createSwitchNavigator(
  {
    [INITIAL]: Initial,
    [LOADING]: Loading,
    [HOME]: TabWithModalRoutes,
    [CHOOSE_LOGIN]: ChooseLoginNavigator,
  },
  {
    initialRouteName: LOADING,
  },
)

const MainRoutes = createAppContainer(AuthWithRoutes)

export default MainRoutes
