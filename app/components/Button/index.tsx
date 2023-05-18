import React from 'react'
import {View} from 'react-native'
import {styled} from 'styled-components/native'
import {useStore} from '@Store'
import Ripple, {RippleProps} from 'react-native-material-ripple'

const StyledRipple = styled(Ripple)<{isRTL: boolean}>`
  align-self: ${({isRTL}) => (isRTL ? 'flex-end' : 'flex-start')};
`

const StyledView = styled(View)<{isRTL: boolean}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`

interface ButtonProps extends RippleProps {
  children: React.ReactElement
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
  const isRTL = useStore.getState().isRTL

  return (
    <StyledRipple
      onPress={onPress}
      isRTL={isRTL}
      rippleColor={RippleColor}
      {...rest}>
      <StyledView isRTL={false}>{children}</StyledView>
    </StyledRipple>
  )
}

export default TCButton
