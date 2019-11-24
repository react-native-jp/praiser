import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLOR } from '../../../constants'
import testIDs from '../../../constants/testIDs'

function HeaderLeft() {
  const { openDrawer } = useNavigation()

  return (
    <Icon.Button
      name="bars"
      color={COLOR.WHITE}
      backgroundColor={COLOR.MAIN}
      onPress={openDrawer}
      testID={testIDs.MENU_HEADER_LEFT_BUTTON}
    />
  )
}

export default HeaderLeft
