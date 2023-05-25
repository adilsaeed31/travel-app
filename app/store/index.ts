import {create} from 'zustand'

import AppStore, {AppStateProps} from './app'
import OnBoardingStore, {OnBoardingStoreProps} from './onboarding'

export type RootStoreProps = AppStateProps & OnBoardingStoreProps

export const useStore = create<RootStoreProps>()((...s) => ({
  ...AppStore(...s),
  ...OnBoardingStore(...s),
}))
