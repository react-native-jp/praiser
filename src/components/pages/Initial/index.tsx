import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { CarouselStatic } from 'react-native-snap-carousel'
import Carousel from '../../organisms/Carousel'
import Pagenation from '../../molecules/Pagenation'
import { CHOOSE_LOGIN } from '../../../constants/path'
import testIDs from '../../../constants/testIDs'
import * as LocalStore from '../../../lib/local-store'

const padding = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
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

export default function Initial() {
  const [activeSlide, changeSlide] = useState(0)
  const { navigate } = useNavigation()

  const carouselRef = useRef(null)
  const onEnd = useCallback(() => {
    LocalStore.InitialLaunch.markAsTutorialIsDone().finally(() => {
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
      <Carousel data={renderData} onEnd={onEnd} onNext={onNext} ref={carouselRef} onSnapToItem={changeSlide} />
      <Pagenation length={renderData.length} index={activeSlide} />
    </View>
  )
}
