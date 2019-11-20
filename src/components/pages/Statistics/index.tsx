import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Progress from './Progress'
import Histories from './Histories'
import { State as TodosState } from '../Home/Todos'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

interface Props {
  statistics: {
    numofAll: number
    numofCompleted: number
    numofUncompleted: number
  }
  histories: TodosState
}

function Statics(props: Props) {
  const { statistics, histories } = props
  return (
    <ScrollView style={styles.container}>
      <Progress {...statistics} />
      <Histories histories={histories} />
    </ScrollView>
  )
}

export default Statics
