import * as React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'

import networkContext from '../contexts/network'
import { height, width } from '../lib/window'

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  container: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function NetworkPanel() {
  const { networkState } = React.useContext(networkContext)
  const isCommunicating = React.useMemo(() => 0 < networkState, [networkState])
  if (!isCommunicating) {
    return null
  }

  return (
    <>
      <SafeAreaView style={styles.dropdown} />
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </>
  )
}
