import React from 'react'
import {Text} from '@ui-kitten/components'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'

const StyledTextView = styled(Text)<any>`
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
  font-family: 'Co Text';
  ${props => props.variant}
`

function TCTextView({
  children,
  variant,
  ...rest
}: {
  children: string
  variant?: any
  className?: string
}) {
  return (
    <StyledTextView
      {...rest}
      variant={variant}
      isRTL={useStore.getState().isRTL}>
      {children}
    </StyledTextView>
  )
}

export default TCTextView
