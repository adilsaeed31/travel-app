import React, {useContext} from 'react'
import {StatusBar, View} from 'react-native'
import {SaibLogo} from '@Assets'
import styled from 'styled-components/native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {TextView as Text} from '@Components'
import {useTranslation} from 'react-i18next'
import {AppContext} from '@Context'

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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
