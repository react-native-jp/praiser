import * as React from 'react'
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { COLOR } from '../constants'

interface Props {
  onPress: () => void
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle
  label?: string
  color?: string
  icon?: string
  disabled?: boolean
  disabledColor?: string
  testID?: string
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: COLOR.WHITE,
  },
})

export default function Button(props: Props) {
  const { onPress, style, textStyle, label, color = '#008080', icon, disabled, disabledColor = '#555', testID } = props
  return (
    <PaperButton
      mode="contained"
      onPress={onPress}
      style={style}
      icon={icon}
      disabled={disabled}
      contentStyle={{
        backgroundColor: disabled ? disabledColor : color,
      }}
      testID={testID}
    >
      {label && <Text style={[styles.text, textStyle]}>{label}</Text>}
    </PaperButton>
  )
}
