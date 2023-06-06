import {StateCreator} from 'zustand'

// below is the example to set the multiple files state and store
export type AuthStateProps = {
  user: null | {}
}

const AuthState: StateCreator<AuthStateProps> = set => ({
  user: null, // TODO for skipping login we can add object there
  setUser: (user: any) => {
    set(() => ({
      user: user,
    }))
  },
})

export default AuthState
