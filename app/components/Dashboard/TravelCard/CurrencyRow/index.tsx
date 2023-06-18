import React from 'react'
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native'
import {Trans} from 'react-i18next'
import cn from 'classnames'

import {useStore} from '@Store'
import {TCTextView} from '@Components'
import {DownArrow, EuroFlag} from '@Assets'
import {currencyFormat, flexRowLayout} from '@Utils'

const CurrencyRow = ({data}: {data: any}) => {
  const isRTL = useStore(state => state.isRTL)
  const activeCardIndex = useStore(state => state.activeCardIndex)

  const [baseUnit, dotUnit] = currencyFormat(
    data?.[activeCardIndex]?.card?.currencies[activeCardIndex]?.balance,
  )
  const currencyCode =
    data?.[activeCardIndex]?.card?.currencies[activeCardIndex]?.currency_code

  return (
    <View
      className={cn(
        flexRowLayout(isRTL),
        'py-2 px-3 m-4 border rounded-2xl border-tc-tab justify-between items-center',
      )}>
      <View className={cn(flexRowLayout(isRTL), 'items-center')}>
        <Image source={EuroFlag} />
        <View style={styles.leftSpace} className="flex-row items-center">
          <Trans
            className="flex-1 items-center justify-center"
            defaults="<0>{{amount1}}</0><1>{{separator}}</1><2>{{amount2}}</2><3>{{code}}</3>"
            values={{
              amount1: baseUnit,
              separator: '.',
              amount2: dotUnit,
              code: currencyCode,
            }}
            components={[
              <TCTextView
                style={styles.font24}
                className="font-tc-bold text-tc-secondary"
              />,
              <TCTextView
                style={styles.font15}
                className="font-tc-light text-tc-secondary"
              />,
              <TCTextView
                style={styles.font15}
                className="font-tc-light text-tc-secondary"
              />,
              <TCTextView
                style={[styles.separator, styles.font15]}
                className="font-tc-light text-tc-secondary"
              />,
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
    marginStart: 8,
    direction: 'ltr',
  },
  separator: {
    marginStart: 4,
    marginEnd: 8,
  },
  font24: {
    fontSize: 24,
    lineHeight: 24,
  },
  font15: {
    fontSize: 15,
    lineHeight: 24,
  },
})

export default CurrencyRow
