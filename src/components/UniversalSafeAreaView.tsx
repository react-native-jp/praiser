import * as React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

interface Props {
  style: ViewStyle
}

const SAV: React.FC<Props> = ({ style, children }) => (
  <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
)

export default SAV
