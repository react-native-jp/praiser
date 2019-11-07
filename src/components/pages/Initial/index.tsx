import React, { useCallback, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import RenderItem from './RenderItem'
import { CHOOSE_LOGIN } from '../../../constants/path'
import { openFirstLaunch } from '../../../lib/local-store'

const { width } = Dimensions.get('window')

const padding = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
  },
})

const renderData = [
  {
    text:
      'brevity is the soul of wit budge an inch\n' +
      'foul play the game is up',
  },
  {
    text:
      "good riddance for goodness' sake!\n" +
      "love is blind in my mind's eye",
  },
  {
    text:
      'neither here nor there seen better days\n' +
      'at one fell swoop a tower of strength Tut, tut!',
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
  }, [])
  const onNext = useCallback(() => {
    const nextIndex = activeSlide === renderData.length - 1 ? activeSlide : 1 + activeSlide
    // @ts-ignore
    setTimeout(() => carouselRef.current.snapToItem(nextIndex), 250)
    changeSlide(nextIndex)
  }, [carouselRef.current, activeSlide])
  return (
    <View style={styles.container}>
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
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgb(255, 255, 255)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  )
}

export default Index
