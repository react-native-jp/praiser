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
      'I must be cruel only to be kind flesh and blood\n' +
      "in a fool's paradise a foregone conclusion\n" +
      'foul play the game is up',
  },
  {
    text:
      "good riddance for goodness' sake!\n" +
      "green-eyed jealousy It's Greek to me\n" +
      'it is high time lie low\n' +
      "love is blind in my mind's eye",
  },
  {
    text:
      'neither here nor there seen better days\n' +
      'the short and the long of it too much of a good thing\n' +
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
    carouselRef.current.snapToItem(nextIndex)
    changeSlide(nextIndex)
  }, [carouselRef.current, activeSlide])
  return (
    <View style={styles.container}>
      <Carousel
        data={renderData}
        ref={carouselRef}
        // @ts-ignore
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
