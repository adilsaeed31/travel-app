import React, {memo} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {default as TCTextView} from '../../TextView'
import TransItem from '../../TransItem'

const BottomSheetBody: React.FC<{
  error: any
  data: any
  isError: boolean
  isLoading: boolean
  hasDisplay: boolean
}> = ({isLoading, isError, error, hasDisplay, data}) => {
  const {t} = useTranslation()

  if (hasDisplay && isLoading) {
    return (
      <View className="justify-center items-center mt-5">
        <TCTextView className="text-large text-tc-secondary">
          Loading ...
        </TCTextView>
      </View>
    )
  }

  if (hasDisplay && isError) {
    return (
      <View className="justify-center items-center mt-5">
        <TCTextView className="mx-5 text-large font-tc-light text-red-900">
          {error?.message}
        </TCTextView>
      </View>
    )
  }

  if (hasDisplay) {
    if (!data) {
      return (
        <View className="justify-center items-center mt-5">
          <TCTextView className="text-large text-tc-secondary">
            {t('TravelCard:noTransactions')}
          </TCTextView>
        </View>
      )
    }

    return data?.map(
      (
        {title, amount, timestamp, currency_code, transaction_type}: any,
        index: number,
      ) => {
        return (
          <TransItem
            key={index}
            index={index}
            title={title}
            number={amount}
            subtitle={timestamp}
            icon={currency_code}
            type={transaction_type}
          />
        )
      },
    )
  }

  return <View />
}

export default memo(BottomSheetBody)
