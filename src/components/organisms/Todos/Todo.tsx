import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

import { COLOR } from '../../../constants/theme';
import * as DoneButton from './DoneButton';
import * as DeleteButton from './DeleteButton';
import TodoDisplay from '../../molecules/Todo';

export { DoneButton, DeleteButton };
export interface GotoDetail {
  (state: State, isEditable: boolean): void;
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

export interface EditableActions {
  toggleTodo: DoneButton.ToggleTodo;
  removeTodo: DeleteButton.RemoveTodo;
  gotoDetail: GotoDetail;
}
interface EditableProps {
  isEditable: true;
  state: State;
  actions: EditableActions;
}
function EditableRow(props: EditableProps) {
  const {
    state,
    isEditable,
    actions: { gotoDetail, toggleTodo, removeTodo },
  } = props;

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

  const onPress = React.useCallback(() => {
    gotoDetail(state, isEditable);
  }, [state, isEditable, gotoDetail]);

  return (
    <SwipeRow
      disableLeftSwipe={!isEditable}
      disableRightSwipe={!isEditable}
      rightOpenValue={-80}
      leftOpenValue={80}
      ref={rowRef}
    >
      <View style={styles.contentContainer}>
        <DoneButton.Component state={state} actions={toggleActions} />
        <DeleteButton.Component state={state} actions={removeActions} />
      </View>
      <TodoDisplay onPress={onPress} title={state.title} detail={state.detail} isDone={state.isDone} />
    </SwipeRow>
  );
}

export interface ReadonlyActions {
  gotoDetail: GotoDetail;
}
interface ReadonlyProps {
  isEditable: false;
  state: State;
  actions: ReadonlyActions;
}
function ReadonlyRow(props: ReadonlyProps) {
  const {
    isEditable,
    state,
    actions: { gotoDetail },
  } = props;
  const onPress = React.useCallback(() => {
    gotoDetail(state, isEditable);
  }, [state, isEditable, gotoDetail]);

  return <TodoDisplay onPress={onPress} title={state.title} detail={state.detail} isDone={state.isDone} />;
}

type Props = EditableProps | ReadonlyProps;

export function Component(props: Props) {
  if (props.isEditable) {
    return <EditableRow {...props} />;
  }
  return <ReadonlyRow {...props} />;
}
