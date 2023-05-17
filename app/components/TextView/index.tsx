import React from 'react'
import {Text} from '@ui-kitten/components'
import {styled} from 'styled-components/native'

import {useStore} from '@Store'

const StyledTextView = styled(Text)<{isRTL: boolean}>`
  font-size: 16px;
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
`

function TCTextView({
  children,
  ...rest
}: {
  children: string
  className?: string
}) {
  return (
    <StyledTextView {...rest} isRTL={useStore.getState().isRTL}>
      {children}
    </StyledTextView>
  )
}

export default TCTextView
