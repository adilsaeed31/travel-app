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
import {SPACER_SIZES} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'
import useAccountApi from './useAccountApi'

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
  const active = useStore(state => state.active)
  const [accountNumber, setAccountNumber] = useState('')

  const {isFetching: isFetchingAccounts, data: AccountsList} =
    useAccountApi('/account/account')

  const {
    isFetching: isFetchingTransactions,
    data: TransactionsList,
    refetch: refetchTransactionList,
  } = useAccountApi('/account/account/transactions/' + accountNumber)

  const onAccountSelection = (index: number) => {
    const accountNo = AccountsList[index - 1]?.number
    setAccountNumber(accountNo)
    refetchTransactionList()
  }
  return (
    <ScrollView scrollEnabled={true}>
      {!isFetchingAccounts && !!Object.keys(AccountsList).length && (
        <UserAccountCarousel onSwipe={onAccountSelection} data={AccountsList} />
      )}
      <View style={{flex: 1, flexGrow: 0.8}}>
        <QuickActions />
      </View>
      <Spacer size={SPACER_SIZES.BASE} />
      <StyledView>
        <TextView>Transactions</TextView>
        <SeeAll>See All</SeeAll>
      </StyledView>
      <View style={{flex: 2, marginBottom: 150, width: '97%'}}>
        {!isFetchingTransactions &&
          !!Object.keys(TransactionsList).length &&
          TransactionsList.map((item, index) => (
            <ListViewItem
              key={index}
              Icon={<LoadCard />}
              title={item.name}
              subtitle={item.timestamp}
              number={item.amount}
            />
          ))}
      </View>
    </ScrollView>
  )
}

export default memo(AccountScreen)
