import React from 'react'
import { CommonActions, useTheme } from '@react-navigation/native'
import SafeAreaView from 'react-native-safe-area-view'
import { DrawerActions, DrawerNavigationState } from '@react-navigation/routers'
import { DrawerContentOptions, DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/src/types'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import TouchableItem from '@react-navigation/drawer/src/views/TouchableItem'
import Color from 'color'

type Props = Omit<DrawerContentOptions, 'contentContainerStyle' | 'style'> & {
  state: DrawerNavigationState
  navigation: DrawerNavigationHelpers
  descriptors: DrawerDescriptorMap
}

type ItemProps = {
  label: string | ((props: { focused: boolean; color: string }) => React.ReactNode)
  icon?: (props: { focused: boolean; size: number; color: string }) => React.ReactNode
  focused?: boolean
  onPress: () => void
  activeTintColor?: string
  inactiveTintColor?: string
  activeBackgroundColor?: string
  inactiveBackgroundColor?: string
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  testID: string
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  label: {
    marginRight: 32,
  },
})

function DrawerItem(props: ItemProps) {
  const { colors } = useTheme()
  const {
    icon,
    label,
    labelStyle,
    focused = false,
    activeTintColor = colors.primary,
    inactiveTintColor = Color(colors.text)
      .alpha(0.68)
      .rgb()
      .string(),
    activeBackgroundColor = Color(activeTintColor)
      .alpha(0.12)
      .rgb()
      .string(),
    inactiveBackgroundColor = 'transparent',
    style,
    onPress,
    ...rest
  } = props

  const { borderRadius = 4 } = StyleSheet.flatten(style || {})
  const color = focused ? activeTintColor : inactiveTintColor
  const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor

  const iconNode = icon ? icon({ size: 24, focused, color }) : null
  const viewStyle = React.useMemo(() => {
    return {
      marginLeft: iconNode ? 32 : 0,
      marginVertical: 5,
    }
  }, [iconNode])
  const textStyle = React.useMemo(() => {
    return {
      color,
    }
  }, [color])
  return (
    <View collapsable={false} {...rest} style={[styles.container, { borderRadius, backgroundColor }, style]}>
      <TouchableItem
        borderless
        delayPressIn={0}
        onPress={onPress}
        testID={props.testID}
        style={[styles.wrapper, { borderRadius }]}
        accessibilityTraits={focused ? ['button', 'selected'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={focused ? ['selected'] : []}
      >
        <React.Fragment>
          {iconNode}
          <View style={[styles.label, viewStyle]}>
            {typeof label === 'string' ? (
              <Text numberOfLines={1} style={[textStyle, labelStyle]}>
                {label}
              </Text>
            ) : (
              label({ color, focused })
            )}
          </View>
        </React.Fragment>
      </TouchableItem>
    </View>
  )
}

export default function DrawerItemList({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
}: Props) {
  return (state.routes.map((route, i) => {
    const focused = i === state.index
    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options
    return (
      <SafeAreaView key={route.key} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItem
          testID={`DRAWER_ITEM_${route.key}`}
          label={drawerLabel !== undefined ? drawerLabel : title !== undefined ? title : route.name}
          icon={drawerIcon}
          focused={focused}
          activeTintColor={activeTintColor}
          inactiveTintColor={inactiveTintColor}
          activeBackgroundColor={activeBackgroundColor}
          inactiveBackgroundColor={inactiveBackgroundColor}
          labelStyle={labelStyle}
          style={itemStyle}
          onPress={() => {
            navigation.dispatch({
              ...(focused ? DrawerActions.closeDrawer() : CommonActions.navigate(route.name)),
              target: state.key,
            })
          }}
        />
      </SafeAreaView>
    )
  }) as React.ReactNode) as React.ReactElement
}
