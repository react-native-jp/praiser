import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProgressPanel, { Statistic } from '../../molecules/ProgressPanel';

import Todos, { State as TodosState } from '../../organisms/Todos';
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

export default function Statstics(props: Props) {
  return <Todos todos={props.histories} isEditable={false} header={<Header {...props} />} />;
}
