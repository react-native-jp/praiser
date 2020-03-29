import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';

import { DETAIL } from '../../../constants/path';
import { COLOR } from '../../../constants/theme';
import DoneButton, { ToggleTodo } from './DoneButton';
import DeleteButton, { RemoveTodo } from './DeleteButton';
import TodoDisplay from './TodoDisplay';

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

interface BaseProps {
  state: State;
}

interface EditableProps extends BaseProps {
  forbiddenEdit: false;
  actions: Actions;
}
function EditableRow(props: EditableProps) {
  const {
    state,
    forbiddenEdit,
    actions: { toggleTodo, removeTodo },
  } = props;

  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(() => {
    navigate(DETAIL, { ...state, forbiddenEdit });
  }, [forbiddenEdit, navigate, state]);

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
      disableLeftSwipe={forbiddenEdit}
      disableRightSwipe={forbiddenEdit}
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

interface DisabledProps extends BaseProps {
  forbiddenEdit: true;
}
function DisabledRow(props: DisabledProps) {
  const { state, forbiddenEdit } = props;

  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(() => {
    navigate(DETAIL, { ...state, forbiddenEdit });
  }, [forbiddenEdit, navigate, state]);

  return <TodoDisplay onPress={gotoDetail} title={state.title} detail={state.detail} isDone={state.isDone} />;
}

type Props = EditableProps | DisabledProps;

export default function Todo(props: Props) {
  if (props.forbiddenEdit) {
    return <DisabledRow {...props} />;
  }
  return <EditableRow {...props} />;
}
