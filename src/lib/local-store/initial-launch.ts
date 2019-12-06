import AsyncStorage from '@react-native-community/async-storage'

const KEY = 'firstopen'

export async function markAsTutorialIsDone() {
  await AsyncStorage.setItem(KEY, JSON.stringify(true))
}

export async function isInitialLaunch() {
  const opened = await AsyncStorage.getItem(KEY)
  return !!opened
}
