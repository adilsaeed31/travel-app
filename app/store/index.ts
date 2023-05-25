import {create} from 'zustand'

import AppStore, {AppStoreProps} from './app'
import OnBoardingStore, {OnBoardingStoreProps} from './onboarding'

export type RootStoreProps = AppStoreProps | OnBoardingStoreProps

export const useStore = create(set => ({
  ...AppStore(set),
  ...OnBoardingStore(set),
}))
