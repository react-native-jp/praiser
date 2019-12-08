import * as React from 'react'

type State = number
interface NetworkAction {
  type: 'begin' | 'end'
}
interface Context {
  networkState: number
  dispatchNetworkActions: React.Dispatch<NetworkAction>
}
const NetworkContext = React.createContext<Context>({
  networkState: 0,
  dispatchNetworkActions: () => {},
})

function reducer(state: State, action: NetworkAction) {
  switch (action.type) {
    case 'begin':
      return state + 1
    case 'end':
      return state - 1
    default:
      return state
  }
}

export { reducer }

export default NetworkContext
