import React from 'react'
import { StyleSheet, Text } from 'react-native'
import testIDs from '../../constants/testIDs'
import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'
import { COLOR } from '../../constants'

interface DrawerItemProps {
  title: string
  onPress: () => void
  testID?: string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },
  itemContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const DrawerItem = (props: DrawerItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer} testID={props.testID}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

function Drawer(props: any) {
  const { navigate } = useNavigation()
  const onPressItem = React.useCallback(
    (routeName: string) => {
      navigate(routeName)
    },
    [navigate],
  )

  return (
    <ScrollView alwaysBounceVertical={false} style={styles.container} testID={testIDs.MENU_DRAWER_ITEMS}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        {/*<DrawerItems {...props} testID={testIDs.MENU_DRAWER_ITEMS} />*/}
        {props.items.map(item => (
          <DrawerItem
            title={item.key}
            key={item.key}
            testID={`DRAWER_ITEM_${item.key}`}
            onPress={() => onPressItem(item.key)}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}
export default Drawer
