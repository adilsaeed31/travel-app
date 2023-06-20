import React from 'react'
import {View} from 'react-native'
import {TCTextView as Text, TCButton as Button} from '@Components'
import {TEXT_VARIANTS} from '@Utils'

import {TemporaryStop} from '@Assets'
import {useTranslation} from 'react-i18next'

const TemporaryStopCard = ({onClick = () => {}, activate = false}) => {
  const {t} = useTranslation()
  return (
    <View>
      <Text className="mt-4 text-lg color-[#9f9fa7]">
        {activate
          ? t('ManageCard:reactivateSheetBody')
          : t('ManageCard:stopSheetBody')}
      </Text>
      <View style={{marginTop: 20, alignSelf: 'center'}}>
        <TemporaryStop />
      </View>
      <View className="mt-0 mb-[35px] self-center"></View>
      <Button
        className="ml-8 mr-8 w-[100%] mb-[15px] self-center"
        onPress={onClick}>
        <Text variant={TEXT_VARIANTS.bodyBold}>
          {activate
            ? t('ManageCard:reactiveteSheetBottom')
            : t('ManageCard:stopSheetBottom')}
        </Text>
      </Button>
    </View>
  )
}

export default TemporaryStopCard
