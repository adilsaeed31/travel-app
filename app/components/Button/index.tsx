import React from 'react'
import {View, Text} from 'react-native'
import {styled} from 'styled-components/native'
import Ripple, {RippleProps} from 'react-native-material-ripple'

const StyledView = styled(View)<{isRTL: boolean; varient: string}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid
    ${props => {
      if (props.varient == 'primary') return '#f8d03b'
      if (props.varient == 'transparent') return '#352D0F'
    }};
  background-color: ${props => {
    if (props.varient == 'primary') return '#f8d03b'
    if (props.varient == 'transparent') return 'transpant'
  }};
  min-height: 56px;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
`

interface ButtonProps extends RippleProps {
  children: React.ReactElement | string
  RippleColor?: string
  onPress?: () => void
  className?: string
  varient?: string
}

const TCButton: React.FC<ButtonProps> = ({
  children,
  onPress,
  RippleColor = 'white',
  varient = 'primary',
  ...rest
}) => {
  return (
    <Ripple onPress={onPress} rippleColor={RippleColor} {...rest}>
      <StyledView isRTL={false} varient={varient}>
        <Text>{children}</Text>
      </StyledView>
    </Ripple>
  )
}

export default TCButton
