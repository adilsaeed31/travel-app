export type FetcherRequestProps = {
  method?: string
  body?: any
  headers?: {}
  token?: string
}

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
      ...rest, // all other options for fetch method
    })

    return res
  } catch (err) {
    console.log('API Error :>> ', err)
    return err
  }
}
