import React from 'react';

export interface User {
  id: string;
  name: string | null;
  mailAddress: string | null;
  photoUrl: string | null;
  createdAt: number | null;
  lastLoginAt: number | null;
}

export type UserInformation = User | null;

export function createInitialState(): UserInformation {
  return null;
}

export const Context = React.createContext({
  userState: createInitialState(),
  setUserState: (_: UserInformation) => {},
});
