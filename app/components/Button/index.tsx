import React from 'react'
import {View} from 'react-native'
import {styled} from 'styled-components/native'
import Ripple, {RippleProps} from 'react-native-material-ripple'

import Text from '../TextView'

const Textview = styled(Text)<any>`
  font-weight: 400;
  font-size: 17px;
`

const StyledView = styled(View)<any>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid
    ${props => {
      if (props.disabled) {
        return '#E1E1E1'
      }
      if (props.varient === 'primary') {
        return '#f8d03b'
      }
      if (props.varient === 'transparent') {
        return '#352D0F'
      }
    }};
  background-color: ${props => {
    if (props.disabled) {
      return '#E1E1E1'
    }
    if (props.varient === 'primary') {
      return '#f8d03b'
    }
    if (props.varient === 'transparent') {
      return 'transpant'
    }
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
  disabled?: boolean
  textcls?: string
  textstyle?: string | object
}

const TCButton: React.FC<ButtonProps> = ({
  children,
  onPress,
  RippleColor = 'white',
  varient = 'primary',
  disabled = false,
  textcls,
  textstyle,
  ...rest
}) => {
  return disabled ? (
    <StyledView isRTL={false} varient={varient} disabled={disabled} {...rest}>
      <Textview style={textstyle} className={textcls}>
        {children}
      </Textview>
    </StyledView>
  ) : (
    <Ripple
      onPress={disabled ? () => {} : onPress}
      rippleColor={RippleColor}
      {...rest}>
      <StyledView isRTL={false} varient={varient} {...rest}>
        <Textview style={textstyle} className={textcls}>
          {children}
        </Textview>
      </StyledView>
    </Ripple>
  )
}

export default TCButton
