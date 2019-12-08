import React from 'react'

export function createInitialState() {
  return {
    visible: false,
    message: '',
    label: 'Done',
  }
}

type SnackBarState = ReturnType<typeof createInitialState>

export const Context = React.createContext({
  error: null as Error | null,
  setError: (_: Error | null) => {},
  snackBar: createInitialState(),
  setSnackBar: (_: SnackBarState) => {},
})
