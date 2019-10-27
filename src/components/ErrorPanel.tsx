import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import errorContext from '../contexts/error'
import { width } from '../lib/window'
import UniversalSafeAreaView from './UniversalSafeAreaView'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
  },
  panel: {
    backgroundColor: 'red',
    padding: 8,
  },
  label: {
    color: 'white',
  },
})

export default function ErrorPanel() {
  const { error } = React.useContext(errorContext)
  if (!error) {
    return null
  }

  return (
    <UniversalSafeAreaView style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.label}>{error.toString()}</Text>
      </View>
    </UniversalSafeAreaView>
  )
}
