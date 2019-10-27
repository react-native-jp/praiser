import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import useTextInput from '../../../lib/hooks/use-TextInput'
import useNetworker from '../../../lib/hooks/use-networker'
import { userContext } from '../../../contexts'
import TextInputItem from '../../TextInputItem'
import Button from '../../Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
})

export default function Input() {
  const title = useTextInput('')
  const detail = useTextInput('')
  const networker = useNetworker()
  const { goBack, getParam } = useNavigation()
  const { userState } = React.useContext(userContext)
  const actions = getParam('actions')

  const addTodo = React.useCallback(async () => {
    await networker(async () => {
      actions.addTodo(userState.id, { title: title.value, detail: detail.value })
      goBack()
    })
  }, [title.value, detail.value])

  return (
    <View style={styles.container}>
      <TextInputItem type="text" {...title}>
        Title
      </TextInputItem>
      <TextInputItem type="text" {...detail}>
        Detail
      </TextInputItem>
      <Button onPress={addTodo} label="Add" />
    </View>
  )
}
