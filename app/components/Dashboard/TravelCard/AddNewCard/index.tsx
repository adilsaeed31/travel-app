import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {NativeWindStyleSheet} from 'nativewind'

import {AddNew} from '@Assets'
import {TCTextView} from '@Components'
import {useTranslation} from 'react-i18next'

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
