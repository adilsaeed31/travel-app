import {TEXT_VARIANTS} from '@Utils'
import React, {useState, useRef, FC} from 'react'
import Text from '../TextView'
import {TextInput, View} from 'react-native'
import styled from 'styled-components/native'
import {useTranslation} from 'react-i18next'

interface CustomInputProps {
  label: string
  schema?: any
  value?: any
  onChangeText?: (text: string) => void
}

const InputWrapper = styled(View)<{isError: boolean; isFocused: boolean}>`
  padding: 12px 16px;
  background: #f5f8f9;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid
    ${props =>
      props.isError
        ? '#F54D3F'
        : props.isFocused
        ? '#FFC900'
        : 'rgba(60, 60, 60, 0.4)'};
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

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

const CustomInput: FC<CustomInputProps> = ({
  label,
  value,
  schema,
  onChangeText = () => {},
}) => {
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>(value)
  const {t} = useTranslation()
  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
    validateInput()
  }

  const validateInput = (): void => {
    try {
      if (schema) {
        schema.validateSync(inputValue)
        setError(null)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleChangeText = (text: string): void => {
    onChangeText(text)
    setInputValue(text)
  }

  return (
    <>
      <InputWrapper isError={!!error} isFocused={isFocused}>
        <InputLabel variant={TEXT_VARIANTS.label} isFocused={isFocused}>
          {label}
        </InputLabel>
        <Input
          ref={inputRef}
          value={inputValue}
          onChangeText={handleChangeText}
          placeholder={isFocused ? '' : '-'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor={'#8c8a86'}
          selectionColor={'#8c8a86'}
        />
      </InputWrapper>
      {error && <ErrorText>{t(error)}</ErrorText>}
    </>
  )
}

export default CustomInput
