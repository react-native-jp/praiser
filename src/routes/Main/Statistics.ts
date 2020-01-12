import { createStackNavigator } from 'react-navigation-stack'
import { DETAIL, STATISTICS } from '../../constants/path'
import { Detail, Statistics } from '../../containers'
import { HeaderLeft, headerStyle, headerTintColor } from '../Header'
import { COLOR } from '../../constants/theme'

const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const StaticsNavigator = createStackNavigator(
  {
    [STATISTICS]: {
      screen: Statistics,
      navigationOptions: {
        headerLeft: HeaderLeft,
        headerStyle,
        headerTintColor,
        title: 'Statics',
      },
    },
    [DETAIL]: {
      screen: Detail,
      navigationOptions: {
        headerStyle,
        headerTintColor,
        title: 'Detail',
      },
    },
  },
  {
    cardStyle,
  },
)

export default StaticsNavigator
