import React from 'react'
import { IconButton as PaperIconButton } from 'react-native-paper'
import { StyleSheet, ViewStyle } from 'react-native'
import { COLOR } from '../../constants'

const styles = StyleSheet.create({
  button: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
    width: 80,
    borderRadius: 0,
    margin: 0,
  },
})

interface Props {
  icon: string
  onPress: () => void
  style: ViewStyle | ViewStyle[]
  testID?: string
  iconColor?: string
}

export default function IconButton(props: Props) {
  const { icon, onPress, style, testID, iconColor = COLOR.WHITE } = props

  return (
    <PaperIconButton
      onPress={onPress}
      color={iconColor}
      size={18}
      style={[styles.button, style]}
      icon={icon}
      testID={testID}
    />
  )
}
