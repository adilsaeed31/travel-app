import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {AddNew} from '@Assets'
import {TCTextView} from '@Components'
import {useTranslation} from 'react-i18next'

const AddNewCard = () => {
  const {t} = useTranslation()

  return (
    <View className="flex-1 w-64 h-36 justify-center bg-tc-card rounded-2xl">
      <TouchableOpacity className="items-center" onPress={() => {}}>
        <AddNew />
        <TCTextView className="font-tc-light text-sm">
          {t('TravelCard:addNew')}
        </TCTextView>
      </TouchableOpacity>
    </View>
  )
}

export default AddNewCard
