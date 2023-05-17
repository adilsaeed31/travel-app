import React, {useContext} from 'react'
import {StatusBar, View, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {useTranslation} from 'react-i18next'

import {SaibLogo} from '@Assets'
import {AppContext} from '@Context'

// import the module like below if its in the same alias folder
import {default as Text} from '../TextView'

const Container = styled(View)`
  padding: 76px 32px 0;
`

const LanguageText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: #3f3d36;
  opacity: 0.75;
  padding-top: 19px;
`

type PropsType = {
  canLanguageChange?: boolean
}

const TopNavigationSimpleUsageShowcase: React.FC<PropsType> = ({
  canLanguageChange = true,
  ...props
}) => {
  const {t} = useTranslation()
  const {changeLanguage} = useContext(AppContext)

  return (
    <Container {...props}>
      <StatusBar />
      <View className="flex-1 items-center justify-center flex-row">
        <SaibLogo width="59" height="64" />
        {canLanguageChange ? (
          <TouchableOpacity onPress={changeLanguage}>
            <LanguageText>{t('onboarding:lang')}</LanguageText>
          </TouchableOpacity>
        ) : null}
      </View>
    </Container>
  )
}

export default TopNavigationSimpleUsageShowcase
