import {create} from 'zustand'

import AppStore, {AppStateProps} from './app'
import AuthState, {AuthStateProps} from './Auth'
import OnBoardingStore, {OnBoardingStoreProps} from './onboarding'

export type RootStoreProps = AppStateProps &
  AuthStateProps &
  OnBoardingStoreProps

export const useStore = create<RootStoreProps>()((...s) => ({
  ...AppStore(...s),
  ...AuthState(...s),
  ...OnBoardingStore(...s),
}))
