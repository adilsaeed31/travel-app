import React from 'react'
import {View} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {NativeWindStyleSheet} from 'nativewind'

import {Colors} from '@Utils'
import {AddNew} from '@Assets'
import {TCTextView} from '@Components'
import {useTranslation} from 'react-i18next'

const AddNewCard = () => {
  const {t} = useTranslation()

  return (
    <View className="card-width-height bg-tc-card rounded-2xl z-2">
      <Ripple
        rippleColor={Colors.Supernova}
        rippleContainerBorderRadius={16}
        className="flex-1 justify-center items-center">
        <AddNew />
        <TCTextView className="font-tc-light text-sm">
          {t('TravelCard:addNew')}
        </TCTextView>
      </Ripple>
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
