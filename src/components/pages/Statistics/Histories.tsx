import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Todo from '../../pages/Home/Todo'
import { COLOR  } from '../../../constants'
import {State as TodosState} from "../Home/Todos"

interface Props {
  histories: TodosState
}

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
  },
  rowContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
  headerTextContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    color: COLOR.WHITE,
    fontSize: 24,
  }
})

export default function Histories(props: Props) {
  const {
    histories,
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>History</Text>
      </View>
      <View style={styles.rowContainer}>
        {histories.map(todo => (
          <>
            <Todo state={todo} forbiddenEdit={true} />
            <View style={styles.separator} />
          </>
        ))}
      </View>
    </View>
  )
}
