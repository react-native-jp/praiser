import * as React from 'react'

export interface UserInformation {
  id: string
  name: string | null
  mailAddress: string | null
  photoUrl: string | null
  createdAt: number | null
  lastLoginAt: number | null
}

const userContext = React.createContext({
  userState: {} as UserInformation,
  setUserState: (_: UserInformation) => {},
})

export default userContext
