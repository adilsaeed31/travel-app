import React from 'react'
import {TextInput, View} from 'react-native'
import {CurrentAccountMiniCard} from '@Assets'
import {useTranslation} from 'react-i18next'

import {TCTextView} from '@Components'

const FundsView = ({title, currency, Icon}) => {
  const {t} = useTranslation()
  return (
    <>
      <View className="flex-row rounded-lg justify-between p-3 bg-tc-load-card">
        <View className="flex-1 flex-grow-[0.2] flex-row items-center self-center justify-between">
          <CurrentAccountMiniCard />
        </View>
        <View className="flex-1 justify-between">
          <TCTextView className="tab-text font-bold text-base">
            {title}
          </TCTextView>
          <TCTextView className="tab-text text-sm  text-tc-load-card-text">
            2,689,54 {currency}
          </TCTextView>
        </View>
      </View>

      <View className=" mt-[20] flex-row justify-between border border-slate-300 rounded-lg p-3 bg-tc-load-input-card">
        <View className="flex-1  flex-row justify-between">
          <TextInput className="flex-1 rounded-lg" />
        </View>
        <View className="flex-1 flex-grow-[0.3] self-center items-center flex-row justify-around">
          {Icon}
          <TCTextView className="text-black text-lg">{currency}</TCTextView>
        </View>
      </View>
    </>
  )
}

export default FundsView
