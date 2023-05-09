import React, {useRef, useState, useEffect, createContext} from 'react'
import {AppState} from 'react-native'

import {storeToken, storeUser, restoreUser, clearStorage} from '@Utils'

export type AuthProviderProps = {
  user?: {} | null
  error?: null | any
  isError?: boolean
  isLoading?: boolean
  login?: (credentials: {username: string; password: string}) => void
  logout?: () => void
  setUser?: () => void
}

type AuthProps = JSX.IntrinsicAttributes &
  React.ProviderProps<AuthProviderProps>

export const AuthContext = createContext<AuthProviderProps>({
  user: {},
  error: null,
  isError: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
})

/**
 * AuthProvider for Travel Card App
 * below we are storing user object after executing login function
 * and logout function we are removing user object to logout user
 */

export function AuthProvider(props: AuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)
  const [user, setUser] = useState<{} | null>(null)

  // Below code is for to check the if the token is still not expired after focus
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState

      setAppStateVisible(appState.current)

      console.log('AppState', appState.current)

      if (appState.current === 'active') {
        //restore user here
        restoreUser(setUser)
      }
    })

    return () => {
      subscription.remove()
    }
  }, [appStateVisible])

  const login = ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      // Setting loading and error to false on starting
      setIsError(false)
      setIsLoading(true)

      // set a user call here and store token and other info
      storeToken('adil')

      // Setting User object to state of this context
      setUser({username, password})
      storeUser({username, password})
    } catch (err: any) {
      setIsError(true)
      setError(err.message ?? err)
      setUser(null)
      setIsLoading(false)
      console.log('Error in login :>> ', err)
    }
  }

  const logout = async () => {
    await clearStorage()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        login,
        logout,
        error,
        isError,
        isLoading,
      }}
    />
  )
}
