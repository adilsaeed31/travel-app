import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import AppStore, {AppStateProps} from './app'
import OnBoardingStore, {OnBoardingStoreProps} from './onboarding'
import Auth from './Auth'

export type RootStoreProps = AppStateProps & OnBoardingStoreProps

export const useStore = create(
  persist(
    set => ({
      ...AppStore(set),
      ...OnBoardingStore(set),
      ...Auth(set),
    }),
    {
      name: 'mainStore', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
