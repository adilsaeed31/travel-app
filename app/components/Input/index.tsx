import {TEXT_VARIANTS} from '@Utils'
import React, {useState, useRef, FC} from 'react'
import {TCTextView as Text} from '@Components'
import {TextInput, View} from 'react-native'

import styled from 'styled-components/native'

interface CustomInputProps {
  label: string
  value?: string
  onChangeText?: (text: string) => void
}

const InputWrapper = styled(View)`
  padding: 12px 16px;
  background: #f5f8f9;
  border-radius: 12px;
  margin-bottom: 8px;
`

const InputLabel = styled(Text)<{isFocused: boolean}>`
  line-height: 18px;
  color: #8c8a86;
  margin-bottom: 4px;
`

const Input = styled(TextInput)`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  height: 24px;
`

const CustomInput: FC<CustomInputProps> = ({
  label,
  value,
  onChangeText = () => {},
}) => {
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  const handleChangeText = (text: string): void => {
    onChangeText(text)
  }

  return (
    <InputWrapper>
      <InputLabel variant={TEXT_VARIANTS.label} isFocused={isFocused}>
        {label}
      </InputLabel>
      <Input
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        placeholder={isFocused ? '' : '-'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        cursorColor={'#8c8a86'}
        selectionColor={'#8c8a86'}
      />
    </InputWrapper>
  )
}

export default CustomInput
