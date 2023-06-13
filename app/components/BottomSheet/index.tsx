import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeWindStyleSheet} from 'nativewind'

import {ChevronUp} from '@Assets'

import {default as TCTextView} from '../TextView'

const BottomSheet = () => {
  const {t} = useTranslation()
  const hasEnableBottomSheet = true

  if (hasEnableBottomSheet) {
    return (
      <View className="absolute bottom-0 w-screen h-36 rounded-3xl bg-white shadow">
        <TouchableOpacity className="absolute top-0 -mt-5 self-center z-0">
          <ChevronUp />
        </TouchableOpacity>

        <View className="recent-container text-sm text-slate-400 mt-3 z-2">
          <TCTextView>{t('TravelCard:recentTrans')}</TCTextView>
        </View>
      </View>
    )
  } else {
    return null
  }
}

NativeWindStyleSheet.create({
  styles: {
    'recent-container': {
      marginStart: 16,
    },
  },
})

export default BottomSheet
