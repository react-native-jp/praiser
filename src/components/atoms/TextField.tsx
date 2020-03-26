import React from 'react';
import { ViewStyle, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR } from '../../constants/theme';

interface Props {
  label: string;
  value: string;
  onChangeText?: (str: string) => void;
  style?: ViewStyle;
  autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year';
  secureTextEntry?: boolean;
  disabled?: boolean;
  testID?: string;
}
const theme = {
  dark: true,
  colors: {
    primary: COLOR.PRIMARY,
    background: COLOR.MAIN,
    text: COLOR.WHITE,
    placeholder: COLOR.PRIMARY,
  },
};

export default function TextField(props: Props) {
  const { label, value, onChangeText = () => {}, style, autoCompleteType, secureTextEntry, disabled, testID } = props;
  return (
    <TextInput
      label={label}
      value={value}
      disabled={disabled}
      onChangeText={onChangeText}
      mode="outlined"
      theme={theme}
      style={style}
      autoCompleteType={autoCompleteType}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
      testID={testID}
    />
  );
}

export function dismiss() {
  Keyboard.dismiss();
}
