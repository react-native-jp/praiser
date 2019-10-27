import React from 'react'
import { ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLOR } from '../constants'

interface Props {
  label: string;
  value: string;
  onChangeText: (str: string) => void;
  style?: ViewStyle;
}
const theme = {
  dark: true,
  colors: {
    primary: COLOR.PRIMARY,
    background: COLOR.MAIN,
    text: COLOR.WHITE,
    placeholder: COLOR.PRIMARY,
  },
}

function TextField(props: Props) {
  const {
    label,
    value,
    onChangeText = () => {},
    style,
  } = props
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      theme={theme}
      style={style}
    />
  )
}

export default TextField
