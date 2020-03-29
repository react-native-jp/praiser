import React from 'react';
import { StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';

import { UiContext } from '../../../contexts';
import { COLOR } from '../../../constants/theme';
import testIDs from '../../../constants/testIDs';
import IconButton from '../../atoms/IconButton';

interface State {
  id: string;
  title: string;
  isDone?: boolean;
}
export interface ToggleTodo {
  (id: string): void;
}

function useToggle(state: State, toggleTodo: ToggleTodo) {
  const { setError } = React.useContext(UiContext);
  return React.useCallback(async () => {
    try {
      toggleTodo(state.id);
      const eventName = state.isDone ? 'complete_todo' : 'uncomplete_todo';
      await analytics().logEvent(eventName, {
        id: state.id,
        name: state.title,
      });
    } catch (error) {
      setError(error);
    }
  }, [state.id, state.isDone, state.title, toggleTodo, setError]);
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.PRIMARY,
  },
  done: {
    backgroundColor: COLOR.MAIN_DARK,
  },
});

interface Props {
  state: State;
  actions: {
    toggleTodo: ToggleTodo;
    closeRow: () => void;
  };
}

export default function DoneButton(props: Props) {
  const toggleTodo = useToggle(props.state, props.actions.toggleTodo);

  const {
    state: { isDone },
    actions: { closeRow },
  } = props;

  const onPress = React.useCallback(() => {
    toggleTodo();
    closeRow();
  }, [toggleTodo, closeRow]);

  return (
    <IconButton
      onPress={onPress}
      icon={isDone ? 'restore' : 'check'}
      style={isDone ? styles.done : styles.button}
      testID={isDone ? testIDs.TODO_ROW_NOT_DONE : testIDs.TODO_ROW_DONE}
    />
  );
}
