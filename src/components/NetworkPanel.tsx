import * as React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'

import { NetworkContext } from '../contexts'
import { height, width } from '../lib/window'
import { COLOR } from '../constants'

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    width,
    height,
    backgroundColor: COLOR.WHITE,
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
  const { networkState } = React.useContext(NetworkContext)
  const isCommunicating = React.useMemo(() => 0 < networkState, [networkState])
  if (!isCommunicating) {
    return null
  }

  return (
    <>
      <SafeAreaView style={styles.dropdown} />
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLOR.SHADOW} />
      </SafeAreaView>
    </>
  )
}
