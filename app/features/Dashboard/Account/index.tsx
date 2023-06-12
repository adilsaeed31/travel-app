import React, {memo, useState, useEffect} from 'react'
import {ScrollView, View} from 'react-native'
import Animated, {FadeInRight} from 'react-native-reanimated'

import {QuickActions, UserAccountCardView} from '@Components'
import ListViewItem from './ListViewItem'
import {FaceIcon} from '@Assets'
import {BASE_URL} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher, token} from '@Api'
import {useIsFocused} from '@react-navigation/native'
import {useQuery} from '@tanstack/react-query'
import {useStore} from '@Store'

type AccountScreenScreenProps = {
  navigation: StackNavigationProp<{
    dataObj?: any
  }>
}

const AccountScreen: React.FC<AccountScreenScreenProps> = ({
  navigation,
}: AccountScreenScreenProps) => {
  const [status, setstatus] = useState(0)
  const isFocused = useIsFocused()
  const active = useStore(state => state.active)

  const url = `${BASE_URL}/account/account`
  const {isFetching, data, refetch} = useQuery({
    queryKey: ['account', url],
    queryFn: async () => {
      let res: any = await fetcher(url, {
        method: 'GET',
        token: token,
      })
      try {
        setstatus(res.status)
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return await res.json()
        }
        return res.status
      } catch (e) {
        setstatus(500)
        return 500 // something went wrong
      }
    },
    refetchOnWindowFocus: false,

    enabled: false, // disable this query from automatically running
  })

  useEffect(() => {
    if (!isFetching && data && isFocused) {
      if (status >= 200 && status < 300) {
      } else if (status > 299 && status < 400) {
        navigation.navigate('OTPAuth')
      } else if (status > 399 && status < 500) {
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isFocused])

  useEffect(() => {
    if (!data && active === 1) {
      refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <ScrollView style={{height: '100%', width: '100%'}}>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserAccountCardView />
      </Animated.View>
      <View style={{flex: 1, flexGrow: 0.8}}>
        <QuickActions />
      </View>
      <View style={{flex: 2, marginBottom: 60}}>
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card Fees *2395'}
          subtitle={'12 Feb, 13:00'}
          number={'-100000'}
        />
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card debit *3395'}
          subtitle={'12 Feb, 13:00'}
          number={'-100000'}
        />
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card credit *3398'}
          subtitle={'12 Feb, 13:00'}
          number={'12000'}
        />
      </View>
    </ScrollView>
  )
}

export default memo(AccountScreen)
