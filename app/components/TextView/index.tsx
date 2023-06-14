import React, {memo} from 'react'
import {Text} from 'react-native'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'

const StyledTextView = styled(Text)<{
  style?: string
  isRTL: boolean
  variant: string
}>`
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
  font-family: 'Co Text';
  ${({variant}) => variant};
`

function TCTextView({
  children,
  variant,
  style,
  ...rest
}: {
  children?: string | React.ReactElement | null
  variant?: any
  className?: string
  style?: string | object | any
}) {
  return (
    <StyledTextView
      style={style}
      variant={variant}
      isRTL={useStore.getState().isRTL}
      {...rest}>
      {children}
    </StyledTextView>
  )
}

export default memo(TCTextView)
