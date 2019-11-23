import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import { COLOR } from '../../../constants'

const styles = StyleSheet.create({
  ratioArea: {
    paddingTop: 20,
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: COLOR.WHITE,
    fontSize: 24,
  },
  headerTextContainer: {
    paddingLeft: 20,
    marginBottom: 8,
  },
  text: {
    color: COLOR.WHITE,
    fontSize: 20,
    marginVertical: 3,
  },
  numberText: {
    marginLeft: 8,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  progress: {
    height: 200,
    width: 200,
  },
})

export interface Statistic {
  numofCompleted: number
  numofAll: number
  numofUncompleted: number
  completedRatio: number
  uncompletedRatio: number
}

export default function Progress(props: Statistic) {
  const { uncompletedRatio, completedRatio } = props
  return (
    <View style={styles.ratioArea}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Progress</Text>
      </View>
      <View style={styles.graphContainer}>
        <ProgressCircle style={styles.progress} progress={completedRatio} progressColor={COLOR.PRIMARY} />
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>Done</Text>
            <Text style={styles.text}>UnDone</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.numberText]}>{completedRatio}</Text>
            <Text style={[styles.text, styles.numberText]}>{uncompletedRatio}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
