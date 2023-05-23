import {fetcher} from '../fetcher'

const BASE_URL = '/'

// replace this login with authcontext login fetcher area
export const checkLogin = (credentials: {
  username: string
  password: string
}) => {
  fetcher(`${BASE_URL}/app/api/Mock/riboAuth2Token.json`, {
    method: 'GET',
    credentials,
  } as any)
}
