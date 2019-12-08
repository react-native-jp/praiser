import React from 'react'

export function createInitialState() {
  return {
    visible: false,
    message: '',
    label: 'Done',
  }
}

type SnackBarState = ReturnType<typeof createInitialState>

const uiContext = React.createContext({
  error: null as Error | null,
  setError: (_: Error | null) => {},
  snackBar: createInitialState(),
  setSnackBar: (_: SnackBarState) => {},
})

export default uiContext
