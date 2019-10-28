import * as React from 'react'
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

interface Props {
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  label?: string
  color?: string
  icon?: string
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '900',
  },
})

export default function Button(props: Props) {
  const { onPress, style, textStyle, label, color = '#008080', icon } = props
  return (
    <PaperButton mode="contained" onPress={onPress} style={style} color={color} icon={icon}>
      {label && <Text style={[styles.text, textStyle]}>{label}</Text>}
    </PaperButton>
  )
}
