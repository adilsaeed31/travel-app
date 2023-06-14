import {useEffect, useRef, useState} from 'react'
import {MockAccount, MockAccountTransaction, fetcher, token} from '@Api'
import {BASE_URL} from '@Utils'
import {useQuery} from '@tanstack/react-query'
import {useStore} from '@Store'
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const useAccountApi = (ApiName: String, Params?: String) => {
  const [data, setData] = useState({})
  const accessToken = useStore.getState().user?.access_token

  const url = `${BASE_URL}${ApiName}`
  const {
    isFetching,
    data: resp,
    refetch,
  } = useQuery({
    queryKey: ['account', url, token],
    queryFn: async () => {
      let res: any = await fetcher(url, {
        method: 'GET',
        token: accessToken,
      })
      try {
        let response = await res.json()
        response = {data: response, status: res?.status}
        return response
      } catch (e) {
        const error = {
          data: {
            timestamp: '00:00:00',
            status: 500,
            error: 'corrupt_response',
            message: res || e?.message,
            path: ApiName,
          },
          status: res?.status,
        }
        return error // something went wrong
      }
    },
    refetchOnWindowFocus: false,

    enabled: false, // disable this query from automatically running
  })
  function isObjectEmpty(obj) {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0
  }

  useEffect(() => {
    if (isObjectEmpty(resp) || !resp) {
      refetch()
    } else {
      switch (resp?.status) {
        case 200: // Success
          setData(resp.data)
          return
        case 400: // Bad Request
        case 401: // Unauthorized
        case 404: // Not Found
        case resp?.status >= 400 && resp?.status: // Internal Server Error
          //TODO remove this , Mocking response for now
          const Mockdata =
            ApiName === '/account/account'
              ? MockAccount
              : MockAccountTransaction
          setData(Mockdata)
          // eslint-disable-next-line no-alert

          Toast.show({
            type: 'error',
            text1: resp?.status,
            text2: resp?.data?.message,
            position: 'top',
            topOffset: 100,
            visibilityTime: 5000,
          })
          return
        default:
          return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resp])

  return {isFetching, data, refetch}
}

export default useAccountApi
