import { createStackNavigator } from 'react-navigation-stack'
import { STATISTICS } from '../../constants/path'
import { Statistics } from '../../containers'
import { HeaderLeft, headerStyle, headerTintColor } from '../Header'
import { COLOR } from '../../constants'

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
      },
    },
  },
  {
    cardStyle,
  },
)

export default StaticsNavigator
