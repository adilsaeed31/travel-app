import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {NativeWindStyleSheet} from 'nativewind'
import {useTranslation} from 'react-i18next'

import {AddNew} from '@Assets'
import {default as TCTextView} from '.././../../TextView'

const AddNewCard = () => {
  const {t} = useTranslation()

  return (
    <View className="card-width-height justify-center bg-tc-card rounded-2xl z-2">
      <TouchableOpacity className="items-center">
        <AddNew />
        <TCTextView className="font-tc-light text-sm">
          {t('TravelCard:addNew')}
        </TCTextView>
      </TouchableOpacity>
    </View>
  )
}

NativeWindStyleSheet.create({
  styles: {
    'card-width-height': {
      width: 255,
      height: 150,
    },
  },
})

export default AddNewCard
