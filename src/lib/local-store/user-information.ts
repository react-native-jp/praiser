import AsyncStorage from '@react-native-community/async-storage';

import { UserInformation } from '../../contexts/user';

const KEY = 'userinformation';

export async function save(userInformation: UserInformation) {
  await AsyncStorage.setItem(KEY, JSON.stringify(userInformation));
}

export async function retrieve() {
  const serialized = await AsyncStorage.getItem(KEY);
  if (!serialized) {
    return null;
  }
  return JSON.parse(serialized);
}

export async function clear() {
  await AsyncStorage.removeItem(KEY);
}
