import React, {useContext} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {AppContext, AppProviderProps} from '@Context'
import styled from 'styled-components/native'
import {Colors} from '@Utils'

interface IRadioBUtton {
  onPress: () => void
  selected: boolean
  children: React.ReactNode
}

const RadioLabel = styled(Text)<{isRTL: boolean; isSelected: boolean}>`
  color: ${props => (props.isSelected ? Colors.back : Colors.Armadillo)};
  font-size: ${props => (props.isSelected ? '16' : '16')};
  margin-left: ${props => (props.isRTL ? '0' : '12')};
  margin-right: ${props => (props.isRTL ? '12' : '0')};
  font-weight: 400;
`
const RadioWrapperStyle = styled(View)<{isRTL: boolean}>`
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  align-items: center;
  margin-bottom: 5;
  margin-right: 20;
`
const RadioButtonIcon = styled(View)`
  height: 16;
  width: 16;
  border-radius: 8px;
  background-color: ${Colors.Supernova};
`
const BtnToogle = styled(TouchableOpacity)<{isSelected: boolean}>`
  height: 24;
  width: 24;
  background-color: ${Colors.Alabaster};
  border-width: 2px;
  border-radius: 12px;
  border-color: ${props => (props.isSelected ? '#333333' : Colors.Nobel)};
  align-items: center;
  justify-content: center;
`
const RadioButton = ({onPress, selected, children}: IRadioBUtton) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <RadioWrapperStyle isRTL={!!isRTL}>
      <BtnToogle isSelected={selected} disabled={selected} onPress={onPress}>
        {selected ? <RadioButtonIcon /> : null}
      </BtnToogle>
      <TouchableOpacity disabled={selected} onPress={onPress}>
        <RadioLabel isSelected={selected} isRTL={!!isRTL}>
          {children}
        </RadioLabel>
      </TouchableOpacity>
    </RadioWrapperStyle>
  )
}
export default RadioButton
