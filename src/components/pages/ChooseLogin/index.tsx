import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../atoms/Button';
import { SIGN_IN, SIGN_UP } from '../../../constants/path';
import { COLOR } from '../../../constants/theme';
import Logo from '../../atoms/Logo';
import testIDs from '../../../constants/testIDs';

const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MAIN,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingVertical: padding,
  },
  button: {
    marginBottom: 40,
    width: 300,
  },
});

export default function ChooseLogin() {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container} testID={testIDs.CHOOSE_LOGIN}>
      <View style={styles.imageContainer}>
        <Logo />
      </View>
      <View style={styles.contentContainer}>
        <Button
          testID={testIDs.SIGN_IN_BUTTON}
          onPress={() => navigate(SIGN_IN)}
          style={styles.button}
          label="Sign in"
        />
        <Button
          testID={testIDs.SIGN_UP_BUTTON}
          onPress={() => navigate(SIGN_UP)}
          style={styles.button}
          label="Sign up"
        />
      </View>
    </View>
  );
}
