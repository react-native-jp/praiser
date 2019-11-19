import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Progress from './Progress'
import * as Domain from '../../../domain/entities'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

interface Props {
  statistics: {
    numofAll: number
    numofCompleted: number
    numofUncompleted: number
  }
  todos: Domain.Todo.Entity[]
}

function Statics(props: Props) {
  const { statistics, todos } = props
  return (
    <View style={styles.container}>
      <Progress {...statistics} />
      <Text>History</Text>
    </View>
  )
}

export default Statics
