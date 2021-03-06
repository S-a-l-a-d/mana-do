import React, { createContext, useReducer } from 'react'

import { AuthTypes, AuthActionTypes } from '../actions/auth'

interface AuthState {
  isAuthenticated: boolean
  token: string
  loading: boolean
}

type AuthContextType = [AuthState, React.Dispatch<AuthActionTypes>]

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  loading: true
}

const reducer = (state: AuthState, { type, payload }: AuthActionTypes): AuthState => {
  switch (type) {
    case AuthTypes.SET_TOKEN:
      return { isAuthenticated: true, token: payload, loading: false }
    default:
      return state
  }
}

export const AuthContext = createContext<AuthContextType>([{}, {}] as AuthContextType)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}
