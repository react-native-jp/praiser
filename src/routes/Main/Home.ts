import { createStackNavigator } from 'react-navigation-stack'
import { DETAIL, HOME } from '../../constants/path'
import { Home, Detail } from '../../containers'
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
        title: 'Home',
      },
    },
    [DETAIL]: {
      screen: Detail,
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
