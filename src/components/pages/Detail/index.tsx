import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import analytics from '@react-native-firebase/analytics'
import TextField from '../../../components/TextField'
import useTextInput from '../../../lib/hooks/use-TextInput'
import Button from '../../../components/Button'
import { userContext, uiContext } from '../../../contexts'
import testIDs from "../../../constants/testIDs";

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
    userId: string,
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
  const id = useNavigation().getParam('id')
  const { userState } = React.useContext(userContext)
  const { setSnackBar } = React.useContext(uiContext)
  const detailInitialValue = useNavigation().getParam('detail')
  const titleInitialValue = useNavigation().getParam('title')
  const forbiddenEdit = useNavigation().getParam('forbiddenEdit')
  const detail = useTextInput(detailInitialValue)
  const title = useTextInput(titleInitialValue)
  const onSubmit = React.useCallback(() => {
    props.actions.changeTodo(userState.id, id, {
      title: title.value,
      detail: detail.value,
    })
    setSnackBar({
      visible: true,
      message: 'edit is completed.',
      label: 'Done',
    })
  }, [detail.value, id, props.actions, setSnackBar, title.value, userState.id])

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
      {!forbiddenEdit && <Button onPress={onSubmit} label="Submit" style={styles.button} testID={testIDs.TODO_DETAIL_SUBMIT_BUTTON}/>}
    </View>
  )
}
