import React from 'react'
import {useTranslation} from 'react-i18next'

import {TCTextView} from '@Components'

export const TravelTitle = () => {
  const {t} = useTranslation()

  return (
    <TCTextView className="font-tc-light text-tc-tab-text text-tc-ios-base">
      {t('Dashboard:tabTitle')}
    </TCTextView>
  )
}

export const AccountTitle = () => {
  const {t} = useTranslation()

  return (
    <TCTextView className="font-tc-light text-tc-tab-text text-tc-ios-base">
      {t('Dashboard:tabTitle2')}
    </TCTextView>
  )
}
