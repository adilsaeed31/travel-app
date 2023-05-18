import {TEXT_VARIANTS} from '@Utils'
import React, {useState, useRef} from 'react'
import {TCTextView as Text} from '@Components'
import {TextInput, View} from 'react-native'
import styled from 'styled-components/native'

const InputWrapper = styled(View)`
  padding: 12px 16px;
  background: #f5f8f9;
  border-radius: 12px;
  margin-bottom: 8px;
`

const InputLabel = styled(Text)`
  line-height: 18px;
  color: #8c8a86;
  margin-bottom: 4px;
`

const Input = styled(TextInput)`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  height: 24px;
`

const CustomInput = ({label, value, onChangeText}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <InputWrapper>
      <InputLabel variant={TEXT_VARIANTS.label} isFocused={isFocused}>
        {label}
      </InputLabel>
      <Input
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={isFocused ? '' : '-'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </InputWrapper>
  )
}

export default CustomInput
