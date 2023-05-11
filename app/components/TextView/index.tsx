import React from 'react'
import {Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import {styled} from 'styled-components/native'
import {styled as NativeWindStyled} from 'nativewind'
import {useStore} from '@Store'

const StyledTextView = styled(NativeWindStyled(Text))<{isRTL: boolean}>`
  font-size: 16px;
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
`

function TextView({
  children,
  className,
}: {
  children: string
  className: string
}) {
  const {t} = useTranslation()
  return (
    <StyledTextView className={className} isRTL={useStore.getState().isRTL}>
      {t(children)}
    </StyledTextView>
  )
}

export default TextView
