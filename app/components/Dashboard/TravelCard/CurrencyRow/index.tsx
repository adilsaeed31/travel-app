import React from 'react'
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout} from '@Utils'
import {TCTextView} from '@Components'
import {DownArrow, EuroFlag} from '@Assets'

const CurrencyRow = ({data, activeIndex}: {data: any; activeIndex: number}) => {
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
        <TCTextView style={styles.leftSpace}>
          {data?.[activeIndex]?.card?.currencies[activeIndex]?.balance ?? '000'}
        </TCTextView>
        <TCTextView className="font-tc-light">
          {t('TravelCard:currentCodeEuro', {
            amount: '.00',
            code:
              data?.[activeIndex]?.card?.currencies[activeIndex]
                ?.currency_code ?? 'SAR',
          })}
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
