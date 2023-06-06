import React from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import cn from 'classnames'
import {useTranslation} from 'react-i18next'

import {DownArrow, EuroFlag} from '@Assets'
import {flexRowLayout, m2} from '@Utils'
import {useStore} from '@Store'
import {TCTextView} from '@Components'

const CurrencyRow = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  return (
    <View
      className={cn(
        flexRowLayout(isRTL),
        'py-2 px-3 mx-6 mt-4 border rounded-2xl border-tc-tab justify-between',
      )}>
      <View className={cn(flexRowLayout(isRTL), 'items-center')}>
        <Image source={EuroFlag} />
        <TCTextView className={cn(m2(isRTL))}>212</TCTextView>
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
