import * as React from 'react'

export interface SnackBar {
  visible: boolean
  message: string
  label: string
}
export const snackBarInitialState = {
  visible: false,
  message: '',
  label: 'Done',
}

const uiContext = React.createContext({
  error: null as Error | null,
  setError: (_: Error | null) => {},
  snackBar: {
    visible: false,
    message: '',
    label: '',
  },
  setSnackBar: (_: SnackBar) => {},
})

export default uiContext
