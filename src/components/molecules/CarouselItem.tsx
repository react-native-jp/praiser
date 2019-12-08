import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Logo from '../atoms/Logo'
import Button from '../atoms/Button'
import { COLOR } from '../../constants'
import { width } from '../../lib/window'

const padding = 20
const edgeNumber = 2
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
  },
  text: {
    fontSize: 28,
    fontWeight: '800',
    color: COLOR.LABEL,
    lineHeight: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width - padding * edgeNumber,
    backgroundColor: COLOR.BACKGROUND,
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 2,
  },
  contentContainer: {
    flex: 3,
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
})

export default function CarouselItem({
  onPress,
  item,
}: {
  item: { text: string; testID: string }
  onPress: () => void
}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.imageContainer}>
          <Logo />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <Button testID={item.testID} onPress={onPress} label="次へ" />
        </View>
      </View>
    </View>
  )
}
