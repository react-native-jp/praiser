import * as React from 'react'

import { errorContext, networkContext } from '../../contexts'

type Task = () => Promise<void>
export default function useNetworking() {
  const { dispatchNetworkActions } = React.useContext(networkContext)
  const { setError } = React.useContext(errorContext)

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
