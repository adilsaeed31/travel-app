import React from 'react'
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native'
import {Trans} from 'react-i18next'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout} from '@Utils'
import {TCTextView} from '@Components'
import {DownArrow, EuroFlag} from '@Assets'

const CurrencyRow = ({data, activeIndex}: {data: any; activeIndex: number}) => {
  const isRTL = useStore(state => state.isRTL)

  return (
    <View
      className={cn(
        flexRowLayout(isRTL),
        'py-2 px-3 m-4 border rounded-2xl border-tc-tab justify-between',
      )}>
      <View className={cn(flexRowLayout(isRTL), 'items-center')}>
        <Image source={EuroFlag} />
        <View className="flex-row" style={styles.leftSpace}>
          <Trans
            defaults="<0>{{amount1}}</0><1>{{separator}}</1><2>{{amount2}}</2><3>{{code}}</3>"
            values={{
              amount1:
                data?.[activeIndex]?.card?.currencies[activeIndex]?.balance ??
                '212',
              separator: '.',
              amount2: '00',
              code:
                data?.[activeIndex]?.card?.currencies[activeIndex]
                  ?.currency_code ?? 'SAR',
            }}
            components={[
              <TCTextView />,
              <TCTextView />,
              <TCTextView className="font-tc-light flex-row" />,
              <TCTextView style={styles.separator} />,
            ]}
          />
        </View>
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
  separator: {
    marginStart: 4,
  },
})

export default CurrencyRow
