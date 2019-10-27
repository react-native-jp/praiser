import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  label: {
    fontSize: 20,
  },
  input: {
    alignSelf: 'stretch',
    height: 36,
    padding: 4,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 24,
  },
})

interface Props {
  value: string
  onChangeText: (newValue: string) => void
  type: 'text' | 'mailAddress' | 'password'
  children: string
}

const supportProps = {
  text: {
    autoCapitalize: 'sentences' as const,
    textContentType: 'none' as const,
    autoCompleteType: 'off' as const,
    keyboardType: 'default' as const,
  },
  mailAddress: {
    autoCapitalize: 'none' as const,
    textContentType: 'emailAddress' as const,
    autoCompleteType: 'email' as const,
    keyboardType: 'email-address' as const,
  },
  password: {
    autoCapitalize: 'none' as const,
    textContentType: 'password' as const,
    autoCompleteType: 'password' as const,
    keyboardType: 'default' as const,
    secureTextEntry: true as const,
  },
}

export default function TextInputItem(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.children}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        {...supportProps[props.type]}
      />
    </View>
  )
}
