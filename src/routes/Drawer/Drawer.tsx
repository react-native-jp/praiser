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
  itemKey: string
  activeItemKey: string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.MAIN,
    paddingVertical: 4,
  },
  itemContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    margin: 16,
    fontWeight: 'bold',
  },
})

const activeColor = COLOR.PRIMARY
const inactiveColor = COLOR.WHITE
const activeBackgroundColor = 'rgba(0, 0, 0, .04)'
const inactiveBackgroundColor = 'transparent'

const DrawerItem = (props: DrawerItemProps) => {
  const focused = props.activeItemKey === props.itemKey

  const textStyle = React.useMemo(() => {
    const color = focused ? activeColor : inactiveColor
    return [styles.itemText, { color }]
  }, [focused])
  const containerStyle = React.useMemo(() => {
    const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor
    return [styles.itemContainer, focused && { backgroundColor }]
  }, [focused])

  return (
    <TouchableOpacity onPress={props.onPress} style={containerStyle} testID={props.testID}>
      <Text style={textStyle}>{props.title}</Text>
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
        {props.items.map((item: any) => (
          <DrawerItem
            title={item.key}
            testID={`DRAWER_ITEM_${item.key}`}
            onPress={() => onPressItem(item.key)}
            key={item.key}
            itemKey={item.key}
            activeItemKey={props.activeItemKey}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}
export default Drawer
