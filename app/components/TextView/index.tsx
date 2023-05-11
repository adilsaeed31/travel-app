import React from 'react'
import {Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'

const StyledTextView = styled(Text)<{isRTL: boolean}>`
  font-size: 16px;
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
`

function TextView({children}: {children: string}) {
  const {t} = useTranslation()
  return (
    <StyledTextView isRTL={useStore.getState().isRTL}>
      {t(children)}
    </StyledTextView>
  )
}

export default TextView
