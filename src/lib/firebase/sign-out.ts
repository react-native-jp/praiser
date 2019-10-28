import analytics from '@react-native-firebase/analytics'
import auth from '@react-native-firebase/auth'

export default async function signOut() {
  await analytics().resetAnalyticsData()
  await auth().signOut()
}
