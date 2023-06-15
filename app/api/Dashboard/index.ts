import {useStore} from '@Store'
import {BASE_URL} from '@Utils'

import {fetcher} from '../fetcher'

export const getCardsData = async () => {
  const user = useStore.getState().user

  const res: any = await fetcher(`${BASE_URL}/card/card`, {
    token: user?.access_token,
  })

  const data = await res.json()
  console.log(data, 'data card')

  if (data?.status > 200) {
    throw Error(data?.message)
  }

  return data
}

export const getTransData = async (
  queryKey: (string | {currency: string})[] | [any | any],
) => {
  const [_key, {currency}] = queryKey
  const user = useStore.getState().user

  const res: any = await fetcher(`${BASE_URL}/card/transactions`, {
    method: 'POST',
    body: {currency},
    token: user?.access_token,
  })

  const data = await res.json()
  console.log(data, 'data trans')

  if (data?.status > 200) {
    throw Error(data?.message)
  }

  return data
}
