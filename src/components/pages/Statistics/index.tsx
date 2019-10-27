import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface Props {
  statistics: {
    numofAll: number
    numofCompleted: number
    numofUncompleted: number
  }
}

function Statics(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Statics</Text>
      <Text>
        {props.statistics.numofCompleted} / {props.statistics.numofAll}
      </Text>
    </View>
  )
}

export default Statics
