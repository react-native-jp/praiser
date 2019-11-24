import React, { useCallback, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import Carousel, { Pagination, CarouselStatic } from 'react-native-snap-carousel'

import RenderItem from './RenderItem'
import { CHOOSE_LOGIN } from '../../../constants/path'
import { openFirstLaunch } from '../../../lib/local-store'
import { COLOR } from '../../../constants'
import testIDs from '../../../constants/testIDs'

const { width } = Dimensions.get('window')

const padding = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: COLOR.WHITE,
  },
  carouselContainer: {
    backgroundColor: COLOR.CAROUSEL_BACKGROUND,
  },
})

interface Data {
  text: string
}

const renderData = [
  {
    text: 'brevity is the soul of wit budge an inch\n' + 'foul play the game is up',
    testID: testIDs.INITIAL_NEXT_BUTTON1,
  },
  {
    text: "good riddance for goodness' sake!\n" + "love is blind in my mind's eye",
    testID: testIDs.INITIAL_NEXT_BUTTON2,
  },
  {
    text: 'neither here nor there seen better days\n' + 'at one fell swoop a tower of strength Tut, tut!',
    testID: testIDs.INITIAL_NEXT_BUTTON3,
  },
]

function Index() {
  const [activeSlide, changeSlide] = useState(0)
  const { navigate } = useNavigation()

  const carouselRef = useRef(null)
  const onEnd = useCallback(() => {
    openFirstLaunch().finally(() => {
      navigate(CHOOSE_LOGIN)
    })
  }, [navigate])

  const onNext = useCallback(() => {
    const nextIndex = activeSlide === renderData.length - 1 ? activeSlide : 1 + activeSlide
    setTimeout(() => {
      if (!carouselRef || !carouselRef.current) {
        return
      }
      const carousel = (carouselRef.current as any) as CarouselStatic<Data>
      carousel.snapToItem(nextIndex)
    }, 250)
    changeSlide(nextIndex)
  }, [activeSlide])

  return (
    <View style={styles.container} testID={testIDs.INITIAL}>
      <Carousel
        data={renderData}
        ref={carouselRef}
        renderItem={({ item, index }) => (
          <RenderItem item={item} onPress={index === renderData.length - 1 ? onEnd : onNext} />
        )}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={changeSlide}
      />
      <Pagination
        dotsLength={renderData.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.carouselContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  )
}

export default Index
