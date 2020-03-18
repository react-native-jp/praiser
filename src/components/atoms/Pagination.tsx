import React from 'react'
import { StyleSheet } from 'react-native'
import { Pagination as SCPagination } from 'react-native-snap-carousel'
import { COLOR } from '../../constants/theme'

const styles = StyleSheet.create({
  pageNation: {
    backgroundColor: COLOR.CAROUSEL_BACKGROUND,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: COLOR.WHITE,
  },
})

interface Props {
  length: number
  index: number
}

export default function Pagination(props: Props) {
  const { length, index } = props
  return (
    <SCPagination
      dotsLength={length}
      activeDotIndex={index}
      containerStyle={styles.pageNation}
      dotStyle={styles.dot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      animatedDuration={250}
      animatedFriction={4}
      animatedTension={50}
      delayPressInDot={0}
    />
  )
}
