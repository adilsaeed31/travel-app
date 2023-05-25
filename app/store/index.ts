import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import EncryptedStorage from 'react-native-encrypted-storage'

import AppStore, {AppStateProps} from './app'
import AuthState, {AuthStateProps} from './Auth'
import OnBoardingStore, {OnBoardingStoreProps} from './onboarding'

export type RootStoreProps = AppStateProps &
  AuthStateProps &
  OnBoardingStoreProps

export const useStore = create<RootStoreProps>()(
  persist(
    (...s) => ({
      ...AppStore(...s),
      ...AuthState(...s),
      ...OnBoardingStore(...s),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => EncryptedStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
