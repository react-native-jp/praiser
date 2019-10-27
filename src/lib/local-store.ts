import AsyncStorage from '@react-native-community/async-storage'

import { UserInformation } from '../contexts/user'

const KEY = 'userinformation'

export async function saveUserInformation(userInformation: UserInformation) {
  await AsyncStorage.setItem(KEY, JSON.stringify(userInformation))
}

export async function retrieveUserInformation() {
  const serialized = await AsyncStorage.getItem(KEY)
  if (!serialized) {
    return null
  }
  return JSON.parse(serialized)
}

export async function clearUserInformation() {
  await AsyncStorage.removeItem(KEY)
}

const FIRST_OPEND_KEY = 'firstopen'

export async function openFirstLaunch() {
  await AsyncStorage.setItem(FIRST_OPEND_KEY, 'True')
}

export async function isOpendFirstLaunch() {
  const opened = await AsyncStorage.getItem(FIRST_OPEND_KEY)
  if (!opened) {
    return false
  }
  return true
}
