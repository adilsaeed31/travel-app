import React, {memo, useState, useEffect} from 'react'
import {ScrollView, View} from 'react-native'

import {
  QuickActions,
  Spacer,
  TCTextView,
  UserAccountCarousel,
} from '@Components'
import ListViewItem from './ListViewItem'
import {LoadCard} from '@Assets'
import {SPACER_SIZES, vw, vh} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'
import useAccountApi from './useAccountApi'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

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
const ScaletonView = styled.View`
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding-vertical: 23px;
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
  const active = useStore(state => state.active)
  const [accountNumber, setAccountNumber] = useState('')

  const {isFetching: isFetchingAccounts, data: AccountsList} =
    useAccountApi('/account/account')

  const {
    isFetching: isFetchingTransactions,
    data: TransactionsList,
    refetch: refetchTransactionList,
  } = useAccountApi(
    '/account/account/transactions/' + accountNumber,
    !accountNumber,
  )

  const onAccountSelection = (index: number) => {
    const accountNo = AccountsList[index - 1]?.number
    setAccountNumber(accountNo)
    refetchTransactionList()
  }

  function isObjectEmpty(obj) {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0
  }

  useEffect(() => {
    if (AccountsList[0] !== 1) {
      setAccountNumber(AccountsList[0]?.number)
      refetchTransactionList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps asda
  }, [AccountsList])

  return (
    <ScrollView scrollEnabled={true}>
      <UserAccountCarousel onSwipe={onAccountSelection} data={AccountsList} />
      <View style={{flex: 1, flexGrow: 0.8}}>
        <QuickActions />
      </View>
      <Spacer size={SPACER_SIZES.BASE} />
      <StyledView>
        <TextView>Transactions</TextView>
        <SeeAll>See All</SeeAll>
      </StyledView>
      <View style={{flex: 2, marginBottom: 150, width: '97%'}}>
        {TransactionsList[0] !== 1 &&
          TransactionsList.map((item, index) => (
            <ListViewItem
              key={index}
              Icon={<LoadCard />}
              title={item.name}
              subtitle={item.timestamp}
              number={item.amount}
            />
          ))}

        {TransactionsList[0] === 1 && (
          <ScaletonView>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={vw(300)} height={vh(18)} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder borderRadius={4}></SkeletonPlaceholder>

            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={vw(300)} height={vh(18)} />
            </SkeletonPlaceholder>
          </ScaletonView>
        )}
      </View>
    </ScrollView>
  )
}

export default memo(AccountScreen)
