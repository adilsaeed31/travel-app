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
  clickableTextStyle?: TextStyle
  callbacks?: Array<(event: MouseEvent) => void>
}

const LinkContainer = styled.View`
  height: 24px;
  flex-direction: row;
`

const LinkText = styled(Text)<any>`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: rgba(30, 30, 30, 0.5);
  ${({textStyle}) => textStyle}
`

const ClickableText = styled(Text)<any>`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #3f3d36;
  ${({clickableTextStyle}) => clickableTextStyle}
  flex-shrink: 1;
`

const MultiLink: FC<LinkProps> = ({
  onPress,
  textStyle,
  clickableTextStyle,
  callbacks,
  children,
  ...rest
}: any) => {
  const regex = /\[(.*?)\]/g
  const clickableTexts = children
    .match(regex)
    ?.map((text: string) => text.replace(/\[|\]/g, ''))
  const renderLinkText = () => {
    const parts = children.split(regex)
    return parts.map((part: any, index: any) => {
      const clickableText = clickableTexts.find(text => text === part)
      if (clickableText) {
        return (
          <TouchableOpacity
            onPress={e =>
              callbacks[clickableTexts.indexOf(part)](e, clickableText)
            }>
            <ClickableText key={index} clickableTextStyle={clickableTextStyle}>
              {part}
            </ClickableText>
          </TouchableOpacity>
        )
      } else {
        return (
          <LinkText key={index} textStyle={textStyle}>
            {part}
          </LinkText>
        )
      }
    })
  }

  return <LinkContainer {...rest}>{renderLinkText()}</LinkContainer>
}

export default MultiLink
