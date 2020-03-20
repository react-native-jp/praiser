import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { USER_INFO } from '../../constants/path';
import { UserInfo } from '../../components/pages';
import { HeaderLeft, headerStyle, headerTintColor } from '../Header';
import { COLOR } from '../../constants/theme';

const cardStyle = {
  backgroundColor: COLOR.MAIN,
};

const Stack = createStackNavigator();
function UserInfoNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle,
        headerStyle,
        headerTintColor,
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <Stack.Screen name={USER_INFO} component={UserInfo} />
    </Stack.Navigator>
  );
}

export default UserInfoNavigator;
