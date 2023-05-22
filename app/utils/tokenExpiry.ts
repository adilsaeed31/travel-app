import jwtDecode, {JwtPayload} from 'jwt-decode'
import {getToken, getUser, clearStorage} from '@Utils'

// Checking the token expiry date
export const isTokenValid = (token: string) => {
  const decodedToken: JwtPayload = jwtDecode(token)
  const currentDate = new Date().getTime()
  const tokenExpiry = (decodedToken?.exp as number) * 1000
  return currentDate < tokenExpiry
}

// This function is to re-store the user from the storage after the app restarts
export const restoreUser = async (setUser: (user: string[] | null) => void) => {
  try {
    const token = (await getToken()) as string
    console.log('Trying to restore user')

    if (isTokenValid(token)) {
      // Retreiving user object after checking token from device storage
      const user = await getUser()
      setUser(user)
      console.log('Valid user found ... restoring it')
    } else {
      console.log('The token in storage has expired')
      // Clearing user object and removing device storage completely
      setUser(null)
      await clearStorage()
    }
  } catch (error) {
    console.log('Error in restoreUser func token not found', error)
  }
}
