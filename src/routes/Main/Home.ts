import { createStackNavigator } from 'react-navigation-stack'
import { DETAIL, HOME, INPUT } from '../../constants/path'
import { Detail, Input } from '../../components/pages'
import { Home } from '../../containers'
import { HeaderLeft, headerStyle, headerTintColor } from '../Header'
import { COLOR } from '../../constants'

const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const HomeNavigator = createStackNavigator(
  {
    [HOME]: {
      screen: Home,
      navigationOptions: {
        headerLeft: HeaderLeft,
        headerStyle,
        headerTintColor,
      },
    },
    [DETAIL]: {
      screen: Detail,
      navigationOptions: {
        headerStyle,
        headerTintColor,
      },
    },
    [INPUT]: {
      screen: Input,
      navigationOptions: {
        headerStyle,
        headerTintColor,
      },
    },
  },
  {
    cardStyle,
  },
)

export default HomeNavigator
