import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'
import { BottomTabBar } from 'react-navigation-tabs'
import { COLOR } from '../../constants'

const styles = {
  text: {
    color: COLOR.WHITE,
  },
  container: {
    backgroundColor: COLOR.MAIN,
  },
}

function TabBar(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <BottomTabBar {...props} />
    </SafeAreaView>
  )
}

export default TabBar
