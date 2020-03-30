import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';

import { DETAIL } from '../../../constants/path';
import { COLOR } from '../../../constants/theme';
import DoneButton, { ToggleTodo } from './DoneButton';
import DeleteButton, { RemoveTodo } from './DeleteButton';
import TodoDisplay from '../../molecules/Todo';

export interface Actions {
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
}
export interface State {
  id: string;
  title: string;
  detail?: string;
  isDone?: boolean;
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLOR.MAIN,
    height: 120,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface EditableProps {
  isEditable: true;
  state: State;
  actions: Actions;
}
function EditableRow(props: EditableProps) {
  const {
    state,
    isEditable,
    actions: { toggleTodo, removeTodo },
  } = props;

  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(() => {
    navigate(DETAIL, { ...state, isEditable });
  }, [isEditable, navigate, state]);

  const rowRef = React.useRef<SwipeRow<View>>(null);
  const closeRow = React.useCallback(() => {
    rowRef?.current?.closeRow();
  }, [rowRef]);

  const toggleActions = React.useMemo(() => {
    return {
      toggleTodo,
      closeRow,
    };
  }, [closeRow, toggleTodo]);

  const removeActions = React.useMemo(() => {
    return {
      removeTodo,
      closeRow,
    };
  }, [closeRow, removeTodo]);

  return (
    <SwipeRow
      disableLeftSwipe={!isEditable}
      disableRightSwipe={!isEditable}
      rightOpenValue={-80}
      leftOpenValue={80}
      ref={rowRef}
    >
      <View style={styles.contentContainer}>
        <DoneButton state={state} actions={toggleActions} />
        <DeleteButton state={state} actions={removeActions} />
      </View>
      <TodoDisplay onPress={gotoDetail} title={state.title} detail={state.detail} isDone={state.isDone} />
    </SwipeRow>
  );
}

interface DisabledProps {
  isEditable: false;
  state: State;
}
function ReadonlyRow(props: DisabledProps) {
  const { state, isEditable } = props;

  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(() => {
    navigate(DETAIL, { ...state, isEditable });
  }, [isEditable, navigate, state]);

  return <TodoDisplay onPress={gotoDetail} title={state.title} detail={state.detail} isDone={state.isDone} />;
}

type Props = EditableProps | DisabledProps;

export default function Todo(props: Props) {
  if (props.isEditable) {
    return <EditableRow {...props} />;
  }
  return <ReadonlyRow {...props} />;
}
