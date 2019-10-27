import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLOR } from '../../../constants'

function HeaderLeft() {
  const { openDrawer } = useNavigation()

  return <Icon.Button name="bars" color={COLOR.WHITE} backgroundColor={COLOR.MAIN} onPress={openDrawer} />
}

export default HeaderLeft
