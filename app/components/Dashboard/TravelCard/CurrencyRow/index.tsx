import React from 'react'
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, ml} from '@Utils'
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
        <TCTextView style={styles.leftSpace}>212</TCTextView>
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

const styles = StyleSheet.create({
  leftSpace: {
    marginStart: 4,
  },
})

export default CurrencyRow
