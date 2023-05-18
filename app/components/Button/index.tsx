import React from 'react'
import {View, Text} from 'react-native'
import {styled} from 'styled-components/native'
import Ripple, {RippleProps} from 'react-native-material-ripple'

const StyledView = styled(View)<{isRTL: boolean}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #f8d03b;
  background-color: #f8d03b;
  min-height: 56px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
`

interface ButtonProps extends RippleProps {
  children: React.ReactElement | string
  RippleColor?: string
  onPress?: () => void
  className?: string
}

const TCButton: React.FC<ButtonProps> = ({
  children,
  onPress,
  RippleColor = 'white',
  ...rest
}) => {
  return (
    <Ripple onPress={onPress} rippleColor={RippleColor} {...rest}>
      <StyledView isRTL={false}>
        <Text>{children}</Text>
      </StyledView>
    </Ripple>
  )
}

export default TCButton
