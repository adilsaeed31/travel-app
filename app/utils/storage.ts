import EncryptedStorage from 'react-native-encrypted-storage'

const key = 'authToken' // setting token key
const envKey = 'env' // setting env key
const userKey = 'authUser' // Authenticated User Object
const introKey = 'intro'

const storeToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem(key, token)
  } catch (error) {
    console.log('Error storing the auth token', error)
  }
}

const getToken = async () => {
  try {
    return await EncryptedStorage.getItem(key)
  } catch (error) {
    console.log('Error getting the auth token', error)
  }
}

const storeUser = async (user: any) => {
  try {
    await EncryptedStorage.setItem(userKey, JSON.stringify(user))
  } catch (error) {
    console.log('Error storing the auth token', error)
  }
}

const getUser = async () => {
  try {
    return JSON.parse((await EncryptedStorage.getItem(userKey)) as string)
  } catch (error) {
    console.log('Error getting the auth user', error)
  }
}

const removeToken = async () => {
  try {
    console.log('Removing the token from storage')
    await EncryptedStorage.removeItem(key)
  } catch (error) {
    console.log('Error removing the auth token', error)
  }
}

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear()
    console.log('Clearing the storage')
  } catch (error) {
    console.log('Error clearing the storage', error)
  }
}

const getEnv = async () => {
  try {
    return await EncryptedStorage.getItem(envKey)
  } catch (error) {
    console.log('Error getting the env value', error)
  }
}

const setEnv = async (value: string) => {
  try {
    await EncryptedStorage.setItem(envKey, value)
  } catch (error) {
    console.log('Error storing the env value', error)
  }
}

const setIntro = () => {
  try {
    EncryptedStorage.setItem(introKey, 'true')
  } catch (error) {
    console.log('Error storing the intro key', error)
  }
}

const getIntro = async () => {
  try {
    return await EncryptedStorage.getItem(introKey)
  } catch (error) {
    console.log('Error getting the intro key', error)
  }
}

const setItem = async (keyV: string, data: string) => {
  try {
    await EncryptedStorage.setItem(keyV, data)
  } catch (error) {
    console.log('Error storing the data', error)
  }
}

const getItem = async (keyV: string) => {
  try {
    return await EncryptedStorage.getItem(keyV)
  } catch (error) {
    console.log('Error getting the data', error)
  }
}

export {
  getEnv,
  setEnv,
  getToken,
  getUser,
  storeUser,
  removeToken,
  storeToken,
  clearStorage,
  getIntro,
  setIntro,
  setItem,
  getItem,
}
