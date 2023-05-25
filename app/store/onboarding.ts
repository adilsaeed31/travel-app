import {StateCreator} from 'zustand'

// below is the example to set the multiple files state and store
export type OnBoardingStoreProps = {
  title: string
  setTitle: () => void
}

const OnBoardingState: StateCreator<OnBoardingStoreProps> = set => ({
  title: 'Travel Card OnBoarding',

  setTitle: () => {
    set(() => ({
      title: 'Travel Card OnBoarding',
    }))
  },
})

export default OnBoardingState
