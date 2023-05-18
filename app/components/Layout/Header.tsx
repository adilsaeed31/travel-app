import React, {useContext} from 'react'
import {StatusBar, View, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {useTranslation} from 'react-i18next'
import {SaibLogo} from '@Assets'
import {AppContext} from '@Context'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import {Spacer} from '@Components'
// import the module like below if its in the same alias folder
import {default as Text} from '../TextView'

const Container = styled(View)`
  padding-top: 76px;
  padding-bottom: 0;
`

const LanguageText = styled(Text)`
  line-height: 22px;
  font-weight: 700;
  color: #3f3d36;
  opacity: 0.75;
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
      <View className="flex-row justify-between">
        <SaibLogo />
        {canLanguageChange ? (
          <>
            <TouchableOpacity onPress={changeLanguage}>
              <Spacer size={SPACER_SIZES.MM} />
              <LanguageText variant={TEXT_VARIANTS.body700}>
                {t('onboarding:lang')}
              </LanguageText>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </Container>
  )
}

export default TopNavigationSimpleUsageShowcase
