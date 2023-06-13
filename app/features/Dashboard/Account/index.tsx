import React, {memo, useState, useEffect} from 'react'
import {ScrollView, View} from 'react-native'
import Animated, {FadeInRight} from 'react-native-reanimated'

import {
  QuickActions,
  Spacer,
  TCTextView,
  UserAccountCardView,
} from '@Components'
import ListViewItem from './ListViewItem'
import {LoadCard} from '@Assets'
import {BASE_URL, SPACER_SIZES} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher, token} from '@Api'
import {useIsFocused} from '@react-navigation/native'
import {useQuery} from '@tanstack/react-query'
import {styled} from 'styled-components/native'

type AccountScreenScreenProps = {
  navigation?: StackNavigationProp<{
    dataObj?: any
  }>
}

const TextView = styled(TCTextView)`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  color: #2c343b;
  font-size: 15px;
  line-height: 20px;
`

const StyledView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding-horizontal: 23px;
`

const SeeAll = styled(TCTextView)`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  color: #7f858a;
  font-size: 12px;
  line-height: 14px;
`

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
    if (!data) {
      refetch()
    }
  }, [data, refetch])

  return (
    <ScrollView style={{height: '100%', width: '100%'}}>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserAccountCardView />
      </Animated.View>
      <View style={{flex: 1, flexGrow: 0.8}}>
        <QuickActions />
      </View>
      <Spacer size={SPACER_SIZES.BASE} />
      <StyledView>
        <TextView>Transactions</TextView>
        <SeeAll>See All</SeeAll>
      </StyledView>
      <View style={{flex: 2, marginBottom: 150, width: '97%'}}>
        {data &&
          active === 1 &&
          data.map((item, index) => (
            <ListViewItem
              key={0}
              Icon={<LoadCard />}
              title={'Card Fees *2395'}
              subtitle={'12 Feb, 13:00'}
              number={'-100000'}
            />
          ))}
      </View>
    </ScrollView>
  )
}

export default memo(AccountScreen)
