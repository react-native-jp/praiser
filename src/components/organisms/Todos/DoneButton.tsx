import React from 'react';
import { StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';

import { UiContext } from '../../../contexts';
import { COLOR } from '../../../constants/theme';
import testIDs from '../../../constants/testIDs';
import IconButton from '../../atoms/IconButton';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.PRIMARY,
  },
  done: {
    backgroundColor: COLOR.MAIN_DARK,
  },
});

export interface ToggleTodo {
  (id: string): void;
}
interface Props {
  state: {
    id: string;
    title: string;
    isDone?: boolean;
  };
  actions: {
    toggleTodo: ToggleTodo;
    closeRow: () => void;
  };
}

export function Component(props: Props) {
  const { setError } = React.useContext(UiContext);

  const {
    state: { id, title, isDone },
    actions: { toggleTodo, closeRow },
  } = props;

  const onPress = React.useCallback(async () => {
    try {
      toggleTodo(id);
      closeRow();

      const eventName = isDone ? 'complete_todo' : 'uncomplete_todo';
      await analytics().logEvent(eventName, {
        id: id,
        name: title,
      });
    } catch (error) {
      setError(error);
    }
  }, [id, isDone, title, closeRow, toggleTodo, setError]);

  return (
    <IconButton
      onPress={onPress}
      icon={isDone ? 'restore' : 'check'}
      style={isDone ? styles.done : styles.button}
      testID={isDone ? testIDs.TODO_ROW_NOT_DONE : testIDs.TODO_ROW_DONE}
    />
  );
}
