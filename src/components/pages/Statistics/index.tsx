import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Todos, { Todo, State as TodosState } from '../../organisms/Todos';
import ProgressPanel, { Statistic } from '../../molecules/ProgressPanel';
import { DETAIL } from '../../../constants/path';
import HeaderText from '../../atoms/HeaderText';

const styles = StyleSheet.create({
  headerTextContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 8,
  },
});

interface Props {
  statistics: Statistic;
  histories: TodosState;
}

function Header(props: Props) {
  return (
    <View>
      <ProgressPanel {...props.statistics} />
      <View style={styles.headerTextContainer}>
        <HeaderText text="History" />
      </View>
    </View>
  );
}

export default function Statistics(props: Props) {
  const { navigate } = useNavigation();
  const gotoDetail = React.useCallback(
    (state: Todo.State, isEditable: boolean) => {
      navigate(DETAIL, { ...state, isEditable });
    },
    [navigate],
  );
  const actions = React.useMemo(() => ({ gotoDetail }), [gotoDetail]);

  return <Todos isEditable={false} todos={props.histories} actions={actions} header={<Header {...props} />} />;
}
