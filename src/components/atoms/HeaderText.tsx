import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
  headerText: {
    color: COLOR.WHITE,
    fontSize: 24,
  },
});

interface Props {
  text: string;
}

export default function HeaderText(props: Props) {
  const { text } = props;
  return <Text style={styles.headerText}>{text}</Text>;
}
