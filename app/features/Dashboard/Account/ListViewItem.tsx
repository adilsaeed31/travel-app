import React from 'react'
import styled from 'styled-components/native'
import {vh, vw} from '@Utils'

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

const Number = styled.Text`
  font-style: normal;
  flex: 1;
  flex-grow: 0.5;
  text-align: right;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`

const ListViewItem = ({Icon, title, subtitle, number}) => {
  return (
    <ListItemContainer>
      <CircleContainer>{Icon}</CircleContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TitleContainer>
      <Number>{number}</Number>
    </ListItemContainer>
  )
}

export default ListViewItem
