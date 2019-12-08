import React from 'react'
import SnapCarousel from 'react-native-snap-carousel'
import CarouselItem from '../molecules/CarouselItem'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

interface Props {
  onEnd: () => void
  onNext: () => void
  ref: any
  onSnapToItem: (slide: number) => void
  data: { text: string; testID: string }[]
}

export default function Carousel(props: Props) {
  const { onEnd, onNext, ref, onSnapToItem, data } = props
  return (
    <SnapCarousel
      data={data}
      ref={ref}
      renderItem={({ item, index }) => (
        <CarouselItem item={item} onPress={index === data.length - 1 ? onEnd : onNext} />
      )}
      sliderWidth={width}
      itemWidth={width}
      onSnapToItem={onSnapToItem}
    />
  )
}
