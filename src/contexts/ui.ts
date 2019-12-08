import React from 'react'

type ErrorState = Error | null
export function createErrorInitialState(): ErrorState {
  return null
}

export function createSnackBarInitialState() {
  return {
    visible: false,
    message: '',
    label: 'Done',
  }
}

type SnackBarState = ReturnType<typeof createSnackBarInitialState>

export const Context = React.createContext({
  error: createErrorInitialState(),
  setError: (_: ErrorState) => {},
  snackBar: createSnackBarInitialState(),
  setSnackBar: (_: SnackBarState) => {},
})
