import React from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'

import {DownArrow, EuroFlag} from '@Assets'
import {TCTextView} from '@Components'

const CurrencyRow = () => {
  const {t} = useTranslation()

  return (
    <View className="flex-row py-2 px-3 m-4 border rounded-2xl border-tc-tab justify-between">
      <View className="flex-row items-center">
        <Image source={EuroFlag} className="mr-2" />
        <TCTextView className="mr-1">212</TCTextView>
        <TCTextView className="font-tc-light">
          {t('TravelCard:currentCodeEuro', {amount: '.34'})}
        </TCTextView>
      </View>

      <TouchableOpacity>
        <DownArrow />
      </TouchableOpacity>
    </View>
  )
}

export default CurrencyRow
