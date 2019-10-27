import * as React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  descs: {
    fontSize: 12,
    color: 'gray',
  },
})

interface Props {
  style?: ViewStyle
}

export default function Or(props: Props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.descs}>────── or ──────</Text>
    </View>
  )
}
