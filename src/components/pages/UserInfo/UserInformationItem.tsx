import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface Item {
  id: string
  value: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  key: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  onecolumn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
})

export default function UserInformationItem(props: Item) {
  if (typeof props.value === 'string') {
    return (
      <View style={styles.container}>
        <Text style={styles.key}>{props.id}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    )
  }
  return <View style={styles.onecolumn}>{props.value}</View>
}
