import {StateCreator} from 'zustand'

// below is the example to set the multiple files state and store
export type OnBoardingStoreProps = {
  govtId?: string
  onboardingMobileNumber?: string
}

const OnBoardingState: StateCreator<OnBoardingStoreProps> = set => ({
  setOnboardingDetails: (
    mobileNumber: string,
    govtId: string,
    referenceNumber: string,
  ) => {
    set(() => ({
      onboardingMobileNumber: mobileNumber,
      govtId: govtId,
      onboardingOTPRef: referenceNumber,
    }))
  },
})

export default OnBoardingState
