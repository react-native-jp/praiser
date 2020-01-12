import { createStackNavigator } from 'react-navigation-stack'
import { USER_INFO } from '../../constants/path'
import { UserInfo } from '../../components/pages'
import { HeaderLeft, headerStyle, headerTintColor } from '../Header'
import { COLOR } from '../../constants/theme'

const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const UserInfoNavigator = createStackNavigator(
  {
    [USER_INFO]: {
      screen: UserInfo,
      navigationOptions: {
        headerLeft: HeaderLeft,
        headerStyle,
        headerTintColor,
        title: 'UserInfo',
      },
    },
  },
  {
    cardStyle,
  },
)

export default UserInfoNavigator
