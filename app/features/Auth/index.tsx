import React, {useContext} from 'react'
import {Layout, Text, Button} from '@ui-kitten/components'
import {styled} from 'nativewind'
import {TextView} from '@Components'
import {AppContext, AuthContext} from '@Context'
import {SaibLogo} from '@Assets'
import {useTranslation} from 'react-i18next'

// Below is the UI kitten component Layout
const SBLayoutView = styled(Layout)
const SBText = styled(Text)

export default function AuthFeature() {
  const {changeLanguage} = useContext(AppContext)
  const {t} = useTranslation()
  const {isLoading, isError, error} = useContext(AuthContext)

  return (
    <SBLayoutView className="flex-1 px-8 pt-16 pb-8">
      <TextView>{t('auth:title', {name: ''})}</TextView>

      <SBLayoutView className="flex-1 items-center justify-center">
        <SaibLogo />
      </SBLayoutView>

      {isLoading && <SBText className="py-5">Loading ...</SBText>}
      {isError && <SBText className="py-5">Error: {error}</SBText>}

      <Button disabled={isLoading} onPress={() => changeLanguage?.()}>
        {t('auth:buttonLogin') as string}
      </Button>
    </SBLayoutView>
  )
}
