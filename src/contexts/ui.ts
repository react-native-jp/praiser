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

export enum Status {
  FIRST_OPEN = 'firstOpen',
  UNREGISTERED = 'unregistered',
  REGISTERED = 'registered',
}
export const FIRST_OPEN = Status.FIRST_OPEN
export const UNREGISTERED = Status.UNREGISTERED
export const REGISTERED = Status.REGISTERED

interface ApplicationState {
  initialLoaded: boolean
  stage: Status
}

export function createApplicationInitialState(): ApplicationState {
  return {
    initialLoaded: false,
    stage: FIRST_OPEN,
  }
}

export const Context = React.createContext({
  error: createErrorInitialState(),
  setError: (_: ErrorState) => {},
  snackbar: createSnackbarInitialState(),
  setSnackbar: (_: SnackbarState) => {},
  applicationState: createApplicationInitialState(),
  setApplicationState: (_: ApplicationState) => {},
})
