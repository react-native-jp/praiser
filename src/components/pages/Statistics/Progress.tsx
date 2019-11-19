import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import { COLOR } from '../../../constants'

const styles = StyleSheet.create({
  ratioArea: {
    flexDirection: 'row',
    paddingTop: 20,
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
})

interface Props {
  numofCompleted: number
  numofAll: number
  numofUncompleted: number
}

export default function Progress(props: Props) {
  const { numofAll, numofCompleted, numofUncompleted } = props
  return (
    <View style={styles.ratioArea}>
      <ProgressCircle
        style={{ height: 200, width: 200 }}
        progress={numofCompleted / numofAll}
        progressColor={COLOR.PRIMARY}
      />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.text}>Done</Text>
          <Text style={styles.text}>UnDone</Text>
        </View>
        <View>
          <Text style={[styles.text, styles.numberText]}>{Math.round((numofCompleted / numofAll) * 100) / 100}</Text>
          <Text style={[styles.text, styles.numberText]}>{Math.round((numofUncompleted / numofAll) * 100) / 100}</Text>
        </View>
      </View>
    </View>
  )
}
