import React from 'react';
import { StyleSheet } from 'react-native';

import { UiContext } from '../../../contexts';
import { COLOR } from '../../../constants/theme';
import testIDs from '../../../constants/testIDs';
import IconButton from '../../atoms/IconButton';

interface State {
  id: string;
}
export interface RemoveTodo {
  (id: string): void;
}

function useRemove(state: State, removeTodo: RemoveTodo) {
  const { setError } = React.useContext(UiContext);
  return React.useCallback(() => {
    try {
      removeTodo(state.id);
    } catch (e) {
      setError(e);
    }
  }, [state.id, removeTodo, setError]);
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.CAUTION,
  },
});

interface Props {
  state: State;
  actions: {
    removeTodo: RemoveTodo;
    closeRow: () => void;
  };
}

export default function DeleteButton(props: Props) {
  const removeTodo = useRemove(props.state, props.actions.removeTodo);

  const onPress = React.useCallback(() => {
    removeTodo();
    props.actions.closeRow();
  }, [removeTodo, props.actions]);

  return <IconButton onPress={onPress} icon="delete" style={styles.button} testID={testIDs.TODO_ROW_DELETE} />;
}
