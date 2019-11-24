import React from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { Avatar } from 'react-native-paper'
import { CHOOSE_LOGIN } from '../../../constants/path'
import userContext, { UserInformation } from '../../../contexts/user'
import useNetworker from '../../../lib/hooks/use-networker'
import signOutFromFirebase from '../../../lib/firebase/sign-out'
import * as LocalStore from '../../../lib/local-store'
import formatDate from '../../../lib/format-date'
import Button from '../../../components/Button'
import LabelViewContainer from './LabelValueContainer'
import { COLOR } from '../../../constants'
import testIDs from "../../../constants/testIDs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  nameText: {
    color: COLOR.WHITE,
    fontSize: 20,
    marginTop: 5,
  },
  button: {
    marginTop: 30,
  },
})

export default function UserInfo() {
  const { userState, setUserState } = React.useContext(userContext)
  const networker = useNetworker()
  const { navigate } = useNavigation()
  const signOut = React.useCallback(async () => {
    await networker(async () => {
      await signOutFromFirebase()
      setUserState({} as UserInformation)
      await LocalStore.clearUserInformation()
      navigate(CHOOSE_LOGIN)
    })
  }, [navigate, networker, setUserState])
  const source = userState.photoUrl ? { uri: userState.photoUrl } : require('../../../../assets/person.png')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageIconContainer} testID={testIDs.USER_INFO_SCREEN}>
        <Avatar.Image size={220} source={source} />
        <Text style={styles.nameText}>{userState.name}</Text>
      </View>
      <LabelViewContainer label="e-mail" value={userState.mailAddress} />
      <LabelViewContainer
        label="registeredAt"
        value={userState.createdAt && formatDate(new Date(userState.createdAt))}
      />
      <Button style={styles.button} onPress={signOut} label="Sign Out" testID={testIDs.USER_INFO_SIGN_OUT_BUTTON} />
    </SafeAreaView>
  )
}
