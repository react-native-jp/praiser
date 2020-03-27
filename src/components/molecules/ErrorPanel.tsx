import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UiContext } from '../../contexts';
import { width } from '../../lib/window';
import { COLOR } from '../../constants/theme';
import SafeAreaView from 'react-native-safe-area-view';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
  },
  panel: {
    backgroundColor: COLOR.CAUTION,
    padding: 8,
  },
  label: {
    color: COLOR.WHITE,
  },
});

export default function ErrorPanel() {
  const { error, setError } = React.useContext(UiContext);
  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error, setError]);
  return (
    <>
      {error && (
        <SafeAreaView style={styles.container}>
          <View style={styles.panel}>
            <Text style={styles.label}>{error.toString()}</Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
