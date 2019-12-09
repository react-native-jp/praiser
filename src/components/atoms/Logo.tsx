import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'
import reactImage from '../../../assets/reactIcon.jpg'

const edgeNumber = 2
const ratio = 3
const { width } = Dimensions.get('window')
const imageRatio = edgeNumber / ratio

const styles = StyleSheet.create({
  image: {
    width: width * imageRatio,
    flex: 1,
    resizeMode: 'contain',
  },
})

export default function Logo() {
  return <Image source={reactImage} resizeMode="contain" style={styles.image} />
}
