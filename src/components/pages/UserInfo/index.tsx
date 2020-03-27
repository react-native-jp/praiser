import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR } from '../../../constants/theme';
import testIDs from '../../../constants/testIDs';
import { UserContext } from '../../../contexts';
import { Context as UiContext, Status } from '../../../contexts/ui';
import useNetworker from '../../../lib/hooks/use-networker';
import signOutFromFirebase from '../../../lib/firebase/sign-out';
import * as LocalStore from '../../../lib/local-store';
import formatDate from '../../../lib/format-date';
import Button from '../../atoms/Button';
import Avatar from '../../atoms/Avatar';
import LabelViewContainer from '../../atoms/LabelValueContainer';

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
});

export default function UserInfo() {
  const { userState, setUserState } = React.useContext(UserContext);
  const { setApplicationState } = React.useContext(UiContext);
  const networker = useNetworker();
  const signOut = React.useCallback(async () => {
    await networker(async () => {
      await signOutFromFirebase();
      setUserState(null);
      await LocalStore.UserInformation.clear();
      setApplicationState(Status.UN_AUTHORIZED);
    });
  }, [networker, setUserState, setApplicationState]);

  const source = React.useMemo(
    () => (userState?.photoUrl ? { uri: userState.photoUrl } : require('../../../../assets/person.png')),
    [userState],
  );

  if (userState === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageIconContainer} testID={testIDs.USER_INFO_SCREEN}>
        <Avatar source={source} />
        <Text style={styles.nameText}>{userState.name}</Text>
      </View>
      <LabelViewContainer label="e-mail" value={userState.mailAddress} />
      <LabelViewContainer
        label="registeredAt"
        value={userState.createdAt && formatDate(new Date(userState.createdAt))}
      />
      <Button style={styles.button} onPress={signOut} label="Sign Out" testID={testIDs.USER_INFO_SIGN_OUT_BUTTON} />
    </View>
  );
}
