import React from 'react'
import SnapCarousel from 'react-native-snap-carousel'
import RenderItem from '../molecules/RenderItem'
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
      renderItem={({ item, index }) => <RenderItem item={item} onPress={index === data.length - 1 ? onEnd : onNext} />}
      sliderWidth={width}
      itemWidth={width}
      onSnapToItem={onSnapToItem}
    />
  )
}
