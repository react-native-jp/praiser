import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Detail() {
  const id = useNavigation().getParam('id')
  const title = useNavigation().getParam('title')
  React.useEffect(() => {
    async function logViewItem() {
      await analytics().logViewItem({
        item_id: id,
        item_name: title,
        item_category: 'todo',
      })
    }
    logViewItem()
  }, [id, title])

  return (
    <View style={styles.container}>
      <Text>Detail</Text>
    </View>
  )
}
