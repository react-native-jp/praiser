import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import analytics from '@react-native-firebase/analytics';
import Todos from '../../organisms/Todos';
import { Actions as TodosActions, State as TodoState } from '../../../lib/useToggle';
import { COLOR } from '../../../constants/theme';
import { DETAIL, INPUT } from '../../../constants/path';
import testIDs from '../../../constants/testIDs';
import useToggle from '../../../lib/useToggle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    backgroundColor: COLOR.MAIN_DARK,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

interface Props {
  todos: TodoState[];
  actions: TodosActions;
}

export default function Home(props: Props) {
  const { todos, actions } = props;
  React.useEffect(() => {
    async function logViewItemList() {
      await analytics().logViewItemList({
        item_category: 'todo',
      });
    }
    logViewItemList();
  }, []);

  const { navigate } = useNavigation();
  const onPress = React.useCallback(() => {
    navigate(INPUT);
  }, [navigate]);
  const onPressTodo = React.useCallback(
    params => () => {
      navigate(DETAIL, params);
    },
    [navigate],
  );

  return (
    <View style={styles.container} testID={testIDs.HOME}>
      <Todos todos={todos} onPress={onPressTodo} actions={actions} useToggle={useToggle} forbiddenEdit={false} />
      <TouchableOpacity onPress={onPress} style={styles.button} testID={testIDs.TODO_OPEN_INPUT_BUTTON}>
        <Icon color={COLOR.PRIMARY} size={24} name="plus" />
      </TouchableOpacity>
    </View>
  );
}
