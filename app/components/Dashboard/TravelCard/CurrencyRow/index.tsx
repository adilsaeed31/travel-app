import React from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, mr, ml} from '@Utils'
import {TCTextView} from '@Components'
import {DownArrow, EuroFlag} from '@Assets'

const CurrencyRow = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)

  return (
    <View
      className={cn(
        flexRowLayout(isRTL),
        'py-2 px-3 m-4 border rounded-2xl border-tc-tab justify-between',
      )}>
      <View className={cn(flexRowLayout(isRTL), 'items-center')}>
        <Image source={EuroFlag} />
        <TCTextView className={cn(ml(isRTL, 2))}>212</TCTextView>
        <TCTextView className={cn(ml(isRTL, 1), 'font-tc-light')}>
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
