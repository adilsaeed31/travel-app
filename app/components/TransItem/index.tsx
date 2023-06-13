import React, {memo} from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'
import cn from 'classnames'

const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 100%;
`

const Circle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${20}px;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
`

const CircleContainer = styled.View`
  flex: 1;
  flex-grow: 0.3;
  align-items: center;
`
const TitleContainer = styled.View`
  flex: 1;
`

const Title = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
`

const Subtitle = styled.Text`
  font-size: 14px;
  color: #888888;
`

const CREDIT = 'credit'
const DEBIT = 'debit'

const TransItem: React.FC<{
  icon: any
  type: string
  title: string
  subtitle: string
  number: string
}> = ({icon, title, subtitle, number, type}) => {
  return (
    <ListItemContainer>
      <CircleContainer>
        <Circle>
          <Subtitle>{icon}</Subtitle>
        </Circle>
      </CircleContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TitleContainer>
      <Text
        className={cn('font-tc-regular text-sm', {
          'text-red-500': type === CREDIT,
          'text-green-500': type === DEBIT,
        })}>
        {number}
      </Text>
    </ListItemContainer>
  )
}

export default memo(TransItem)
