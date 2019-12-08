import React from 'react'

type ErrorState = Error | null
export function createErrorInitialState(): ErrorState {
  return null
}

export function createSnackbarInitialState() {
  return {
    visible: false,
    message: '',
    label: 'Done',
  }
}

type SnackbarState = ReturnType<typeof createSnackbarInitialState>

export const Context = React.createContext({
  error: createErrorInitialState(),
  setError: (_: ErrorState) => {},
  snackbar: createSnackbarInitialState(),
  setSnackbar: (_: SnackbarState) => {},
})
