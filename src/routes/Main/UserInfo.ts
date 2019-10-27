import { createStackNavigator } from 'react-navigation-stack'
import { USER_INFO } from '../../constants/path'
import { UserInfo } from '../../components/pages'
import { HeaderLeft } from '../Header'
import { COLOR } from '../../constants'

const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const UserInfoNavigator = createStackNavigator(
  {
    [USER_INFO]: {
      screen: UserInfo,
      navigationOptions: {
        headerLeft: HeaderLeft,
      },
    },
  },
  {
    cardStyle,
  },
)

export default UserInfoNavigator
