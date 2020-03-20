import React from 'react';
import analytics from '@react-native-firebase/analytics';
import { UiContext } from '../contexts';

export interface Actions {
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}
export type State = {
  id: string;
  title: string;
  detail?: string;
  isDone?: boolean;
};
export interface EnableEditProps {
  actions: Actions;
  state: State;
  forbiddenEdit: false;
}
export interface DisableEditProps {
  state: State;
  forbiddenEdit: true;
}

export default function useToggle(props: EnableEditProps | DisableEditProps) {
  const { setError } = React.useContext(UiContext);
  const rowRef = React.useRef<any>(null);
  const toggleTodo = React.useCallback(async () => {
    try {
      !props.forbiddenEdit && props.actions.toggleTodo(props.state.id);
      const eventName = props.state.isDone ? 'complete_todo' : 'uncomplete_todo';
      await analytics().logEvent(eventName, {
        id: props.state.id,
        name: props.state.title,
      });
      rowRef.current.closeRow();
    } catch (error) {
      setError(error);
    }
  }, [
    props.forbiddenEdit,
    !props.forbiddenEdit && props.actions,
    props.state.id,
    props.state.isDone,
    props.state.title,
    setError,
  ]);
  const removeTodo = React.useCallback(() => {
    !props.forbiddenEdit && props.actions.removeTodo(props.state.id);
  }, [props.forbiddenEdit, !props.forbiddenEdit && props.actions, props.state.id]);

  return {
    toggleTodo,
    rowRef,
    removeTodo,
  };
}
