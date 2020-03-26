import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 50,
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelContainer: {
    minWidth: 100,
  },
  labelText: {
    color: COLOR.WHITE,
    fontSize: 18,
  },
  valueContainer: {
    flexShrink: 1,
    paddingLeft: 10,
  },
  valueText: {
    color: COLOR.WHITE,
    fontSize: 16,
  },
});

interface Props {
  label: string;
  value: string | number | null;
}

export default function LabelViewContainer(props: Props) {
  const { label, value = '' } = props;

  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}
