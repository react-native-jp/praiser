import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../../atoms/IconButton';
import testIDs from '../../../constants/testIDs';
import { COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.CAUTION,
  },
});

interface DeleteProps {
  onPress: () => void;
}

export default function DeleteButton(props: DeleteProps) {
  const { onPress } = props;
  return <IconButton onPress={onPress} icon="delete" style={styles.button} testID={testIDs.TODO_ROW_DELETE} />;
}
