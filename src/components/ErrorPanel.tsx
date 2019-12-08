import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { UiContext } from '../contexts'
import { width } from '../lib/window'
import { COLOR } from '../constants'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
  },
  panel: {
    backgroundColor: COLOR.CAUTION,
    padding: 8,
  },
  label: {
    color: COLOR.WHITE,
  },
})

export default function ErrorPanel() {
  const { error } = React.useContext(UiContext)
  if (!error) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.label}>{error.toString()}</Text>
      </View>
    </SafeAreaView>
  )
}
