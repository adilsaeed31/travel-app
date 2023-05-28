import SSLPinning, {fetch} from 'react-native-ssl-pinning'

export type FetcherRequestProps = {
  method?: string
  body?: any
  headers?: {}
  token?: string
}
const sslcert = `qtyMan4AoYCBBQA64slXPrFvG5SWJqWM2f67dgy5zis=`

export const fetcher = async (
  url: string,
  {method, body, headers, token, ...rest}: FetcherRequestProps,
) => {
  try {
    // Checking method and re assign
    if (!method) {
      method = 'GET'
    }
    // Changing body payload
    if (body) {
      body = JSON.stringify(body)
    }

    // Merging headers here
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    }

    const res = await fetch(url, {
      method,
      body,
      headers,
      sslPinning: {
        certs: ['qtyMan4AoYCBBQA64slXPrFvG5SWJqWM2f67dgy5zis='],
      },
      disableAllSecurity: true,
      ...rest, // all other options for fetch method
    })
    console.log('mydata', res)
    return res
  } catch (err) {
    console.log('API Error :>> ', err)
    return err
  }
}
