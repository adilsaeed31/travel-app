import React, {FC} from 'react'
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native'
import styled from 'styled-components/native'

interface LinkProps extends TouchableOpacityProps {
  textStyle?: TextStyle
}

const LinkText = styled(Text)<any>`
  font-family: 'Co Text';
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */

  align-items: center;
  text-align: right;
  letter-spacing: -0.4px;

  /* Color/Black-Secondary */

  color: #3f3d36;
  ${({textStyle}) => textStyle}
`

const LinkContainer = styled(TouchableOpacity)`
  width: 129px;
  height: 24px;
`

const Link: FC<LinkProps> = ({onPress, textStyle, children, ...rest}) => {
  return (
    <LinkContainer onPress={onPress} {...rest}>
      <LinkText textStyle={textStyle}>{children}</LinkText>
    </LinkContainer>
  )
}

export default Link
