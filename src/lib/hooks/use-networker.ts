import * as React from 'react'

import { UiContext, networkContext } from '../../contexts'

type Task = () => Promise<void>
export default function useNetworker() {
  const { dispatchNetworkActions } = React.useContext(networkContext)
  const { setError } = React.useContext(UiContext)

  return async (task: Task) => {
    try {
      dispatchNetworkActions({ type: 'begin' })
      await task()
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      dispatchNetworkActions({ type: 'end' })
    }
  }
}
