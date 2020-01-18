import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import ProgressPanel, { Statistic } from '../../molecules/ProgressPanel'
import { COLOR } from '../../../constants/theme'
import Todo from '../../molecules/Todo'
import HeaderText from '../../atoms/HeaderText'

const styles = StyleSheet.create({
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
  histories: TodoState[]
}

export default function Statics(props: Props) {
  const { statistics, histories } = props
  return (
    <FlatList
      data={histories}
      renderItem={({ item }) => <Todo state={item} forbiddenEdit={true} />}
      ListHeaderComponent={
        <View>
          <ProgressPanel {...statistics} />
          <View style={styles.headerTextContainer}>
            <HeaderText text="History" />
          </View>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}
