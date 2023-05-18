import React from 'react'
import {Button} from '@ui-kitten/components'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'

const StyledButton = styled(Button)<{isRTL: boolean}>`
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
`

interface ButtonProps {
  children: React.ReactElement
  onPress?: () => void
  className?: string
}

const TCButton: React.FC<ButtonProps> = ({children, onPress, ...rest}) => (
  <StyledButton onPress={onPress} isRTL={useStore.getState().isRTL} {...rest}>
    {children}
  </StyledButton>
)

export default TCButton
