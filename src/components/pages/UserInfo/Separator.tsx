import * as React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
  },
})

export default function Separator() {
  return <View style={styles.container} />
}
