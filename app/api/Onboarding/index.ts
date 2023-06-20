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

export const getMasterData = async (endpoint: string) => {
  const res: any = await fetcher(
    `${BASE_URL}/content/public/lookup/${endpoint}`,
    {},
  )

  const data = await res.json()

  if (data?.status > 200) {
    throw Error(data?.message)
  }

  return data
}
