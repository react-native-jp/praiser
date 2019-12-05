import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import Progress, { Statistic } from './Progress'
import { State as TodosState } from '../Home/Todos'
import { COLOR } from '../../../constants'
import Index from '../../molecules/Todo'

const styles = StyleSheet.create({
  headerText: {
    color: COLOR.WHITE,
    fontSize: 24,
  },
  headerTextContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SECONDARY,
  },
})

interface Props {
  statistics: Statistic
  histories: TodosState
}

export default function Statics(props: Props) {
  const { statistics, histories } = props
  return (
    <FlatList
      data={histories}
      renderItem={({ item }) => <Index state={item} forbiddenEdit={true} />}
      ListHeaderComponent={
        <View>
          <Progress {...statistics} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>History</Text>
          </View>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}
