import React, {useContext} from 'react'
import {StatusBar, View} from 'react-native'
import {SaibLogo} from '@Assets'
import styled from 'styled-components/native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Spacer, TCTextView as Text} from '@Components'
import {useTranslation} from 'react-i18next'
import {AppContext} from '@Context'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'

const Container = styled(View)`
  padding: 76px 32px 0;
`

const LanguageText = styled(Text)`
  font-weight: 700;
  line-height: 22px;
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
      <View className="flex-1 flex-row">
        <SaibLogo width="59" height="64" />
        {canLanguageChange ? (
          <>
            <Spacer size={SPACER_SIZES.MM} />
            <TouchableOpacity onPress={changeLanguage}>
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
