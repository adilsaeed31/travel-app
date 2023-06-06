import {StateCreator} from 'zustand'

// below is the example to set the multiple files state and store
export type AuthStateProps = {
  user: null | {}
  setUser: (user: any) => void
}

const AuthState: StateCreator<AuthStateProps> = set => ({
  user: null,

  setUser: (user: any) => {
    set(() => ({
      user: user,
    }))
  },
})

export default AuthState
