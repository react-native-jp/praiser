import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { AUTH } from '../../../constants/path'
import userContext, { UserInformation } from '../../../contexts/user'
import useNetworker from '../../../lib/hooks/use-networker'
import signOutFromFirebase from '../../../lib/firebase/sign-out'
import * as LocalStore from '../../../lib/local-store'
import formatDate from '../../../lib/format-date'
import UserInformationItem, { Item } from './UserInformationItem'
import Separator from './Separator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  information: {
    alignSelf: 'stretch',
  },
  informationContainer: {
    alignSelf: 'stretch',
  },
  buttonLabel: {
    fontSize: 16,
    color: 'blue',
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
      navigate(AUTH)
    })
  }, [])

  const userInformation = React.useMemo(
    () => [
      { id: 'user name', value: userState.name },
      {
        id: 'registered at',
        value: userState.createdAt && formatDate(new Date(userState.createdAt)),
      },
      {
        id: 'mailAddress',
        value: userState.mailAddress,
      },
      {
        id: 'sign out',
        value: (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.buttonLabel}>Sign Out</Text>
          </TouchableOpacity>
        ),
      },
    ],
    [userState],
  ) as Item[]

  return (
    <SafeAreaView style={styles.container}>
      {userState.photoUrl ? (
        <Image source={{ uri: userState.photoUrl }} style={styles.image} />
      ) : (
        <Image source={require('../../../../assets/person.png')} style={styles.image} />
      )}
      <FlatList
        style={styles.information}
        contentContainerStyle={styles.informationContainer}
        data={userInformation}
        renderItem={({ item }: { item: Item }) => <UserInformationItem {...item} />}
        keyExtractor={(item: Item) => item.id}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  )
}
