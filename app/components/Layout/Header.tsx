import React from 'react'
import {StatusBar, View, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {useTranslation} from 'react-i18next'
import {SaibLogo, ArrowLeft} from '@Assets'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import {Spacer} from '@Components'
import {default as Text} from '../TextView'
import {useStore} from '@Store'

const Container = styled(View)<{isRTL: boolean | undefined}>`
  padding-top: 36px;
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
`

const ViewSub = styled(View)<{isRTL?: boolean | undefined}>`
  justify-content: space-between;
  flex: 1;
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
`

const LanguageText = styled(Text)`
  line-height: 22px;
  font-weight: 700;
  color: #3f3d36;
  opacity: 0.75;
`
const ArrowLeftIcon = styled(ArrowLeft)`
  width: 12px;
  height: 20.5px;
  margin-right: 6px;
`
const LanguageBackText = styled(Text)`
  line-height: 22px;
  font-weight: 400;
  color: #4f4f4f;
`

type PropsType = {
  canLanguageChange?: boolean
  onBack?: () => void
  isBack?: boolean
}

const TopNavigationSimpleUsageShowcase: React.FC<PropsType> = ({
  canLanguageChange = true,
  isBack = false,
  onBack = () => {},
  ...props
}) => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const toggleLanguage = useStore(state => state.toggleLanguage)

  return (
    <Container {...props} isRTL={isRTL}>
      <StatusBar />
      {isBack ? (
        <TouchableOpacity onPress={onBack}>
          <ViewSub>
            <ArrowLeftIcon />
            <LanguageBackText variant={TEXT_VARIANTS.bodyBold}>
              {t('common:back')}
            </LanguageBackText>
          </ViewSub>
        </TouchableOpacity>
      ) : (
        <ViewSub isRTL={isRTL}>
          <SaibLogo />
          {canLanguageChange ? (
            <>
              <TouchableOpacity onPress={toggleLanguage}>
                <Spacer size={SPACER_SIZES.MM} />
                <LanguageText variant={TEXT_VARIANTS.bodyBold}>
                  {t('onboarding:lang')}
                </LanguageText>
              </TouchableOpacity>
            </>
          ) : null}
        </ViewSub>
      )}
    </Container>
  )
}

export default TopNavigationSimpleUsageShowcase
