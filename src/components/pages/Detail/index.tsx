import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'

import TextField from '../../../components/TextField'
import { useControlledComponent } from '../../../lib/hooks'
import Button from '../../../components/Button'
import { UiContext } from '../../../contexts'
import testIDs from '../../../constants/testIDs'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
})

interface TodoEditActions {
  changeTodo: (
    id: string,
    newValue: {
      title: string
      detail: string
    },
  ) => void
}

interface Props {
  actions: TodoEditActions
}

export default function Detail(props: Props) {
  const { getParam } = useNavigation()
  const id = getParam('id')

  const forbiddenEdit = getParam('forbiddenEdit')
  const titleInitialValue = getParam('title')
  const title = useControlledComponent(titleInitialValue)
  const detail = useControlledComponent(getParam('detail'))

  const { setSnackbar } = React.useContext(UiContext)
  const onSubmit = React.useCallback(() => {
    props.actions.changeTodo(id, {
      title: title.value,
      detail: detail.value,
    })
    setSnackbar({
      visible: true,
      message: 'edit is completed.',
      label: 'Done',
    })
  }, [title.value, detail.value, id, props.actions, setSnackbar])

  React.useEffect(() => {
    async function logViewItem() {
      await analytics().logViewItem({
        item_id: id,
        item_name: titleInitialValue,
        item_category: 'todo',
      })
    }
    logViewItem()
  }, [id, titleInitialValue])

  return (
    <View style={styles.container} testID={testIDs.TODO_DETAIL_SCREEN}>
      <TextField
        disabled={forbiddenEdit}
        label="title"
        value={title.value}
        onChangeText={title.onChangeText}
        style={styles.textField}
        testID={testIDs.TODO_DETAIL_INPUT_TITLE}
      />
      <TextField
        disabled={forbiddenEdit}
        label="detail"
        value={detail.value}
        onChangeText={detail.onChangeText}
        style={styles.textField}
        testID={testIDs.TODO_DETAIL_INPUT_DETAIL}
      />
      {!forbiddenEdit && (
        <Button onPress={onSubmit} label="Submit" style={styles.button} testID={testIDs.TODO_DETAIL_SUBMIT_BUTTON} />
      )}
    </View>
  )
}
