import { firebase } from '@react-native-firebase/auth'

export default async function signOut() {
  await firebase.auth().signOut()
}
