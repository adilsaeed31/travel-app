import React from 'react'
import {View} from 'react-native'
import {TCTextView as Text, TCButton as Button} from '@Components'
import {useTranslation} from 'react-i18next'
import {SuccessMark} from '@Assets'

const CardStopedOrActivatedSuccess = ({activateCard = false}) => {
  const {t} = useTranslation()
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <SuccessMark />
      <Text style={{marginTop: 40, marginBottom: 100}}>
        {activateCard
          ? t('ManageCard:cardActivatedSuccessfully')
          : t('ManageCard:cardStopedSuccessfully')}
      </Text>
    </View>
  )
}
export default CardStopedOrActivatedSuccess
