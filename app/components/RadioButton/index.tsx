import React, {useContext} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {AppContext, AppProviderProps} from '@Context'
import styled from 'styled-components/native'
import {Colors} from '@Utils'

interface IRadioBUtton {
  onPress: () => void
  selected: boolean
  disabled?: boolean
  children: React.ReactNode
}

const RadioLabel = styled(Text)<{
  isRTL: boolean
  isSelected: boolean
  disabled?: boolean | null
}>`
  color: ${props =>
    props.isSelected || props.disabled ? Colors.black : Colors.Armadillo};
  font-size: ${props => (props.isSelected ? '16' : '16')}px;
  margin-left: ${props => (props.isRTL ? '0' : '12')}px;
  margin-right: ${props => (props.isRTL ? '12' : '0')}px;
  font-weight: 400;
`
const RadioWrapperStyle = styled(View)<{isRTL: boolean}>`
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  align-items: center;
  margin-bottom: 5px;
  margin-right: 20px;
`
const RadioButtonIcon = styled(View)`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background-color: ${Colors.Supernova};
`
const BtnToogle = styled(TouchableOpacity)<{isSelected: boolean}>`
  height: 24px;
  width: 24px;
  background-color: ${Colors.Alabaster};
  border-width: 2px;
  border-radius: 12px;
  border-color: ${props => (props.isSelected ? '#333333' : Colors.Nobel)};
  align-items: center;
  justify-content: center;
`
const RadioButton = ({onPress, selected, disabled, children}: IRadioBUtton) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <RadioWrapperStyle isRTL={!!isRTL}>
      <BtnToogle
        isSelected={selected}
        disabled={selected}
        onPress={disabled ? () => {} : onPress}>
        {selected ? <RadioButtonIcon /> : null}
      </BtnToogle>
      <TouchableOpacity
        disabled={selected}
        activeOpacity={disabled ? 1 : 0.5}
        onPress={disabled ? () => {} : onPress}>
        <RadioLabel isSelected={selected} disabled={disabled} isRTL={!!isRTL}>
          {children}
        </RadioLabel>
      </TouchableOpacity>
    </RadioWrapperStyle>
  )
}
export default RadioButton
