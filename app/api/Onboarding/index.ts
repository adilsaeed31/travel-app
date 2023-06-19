import {BASE_URL, prependZeroIfNotPresent} from '@Utils'

import {fetcher} from '../fetcher'

export const triggerOTP = async (state: {
  mobileNumber: string
  govtId: any
}) => {
  let req: any = await fetcher(BASE_URL + '/auth/otp', {
    method: 'POST',
    body: {
      mobile_number: prependZeroIfNotPresent(state.mobileNumber),
      identity_number: state.govtId,
      role: 'ONBOARDING',
    },
  })
  let res = await req.json()
  return res
}