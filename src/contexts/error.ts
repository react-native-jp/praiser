import * as React from 'react'

const errorContext = React.createContext({
  error: null as Error | null,
  setError: (_: Error | null) => {},
})

export default errorContext
