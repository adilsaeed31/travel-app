import {fetcher} from '../fetcher'

export const getCardsData = async (url, option) => {
  const res = await fetcher(url, options)
  const data = res?.json()

  return data
}
