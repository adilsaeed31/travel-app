import React, {useState, useRef, FC, useEffect, memo} from 'react'
import {
  TextInput,
  View,
  TouchableOpacity,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'

import {useStore} from '@Store'
import {Eye, EyeClosed} from '@Assets'
import {TEXT_VARIANTS} from '@Utils'
import Text from '../TextView'

function formatSentence(sentence: any) {
  var firstLetter = sentence.charAt(0).toUpperCase()
  var restOfSentence = sentence.slice(1).toLowerCase()
  return firstLetter + restOfSentence
}

interface CustomInputProps {
  label: string
  schema?: any
  value?: any
  isPassword?: boolean
  maxLength?: number
  isDisabled?: boolean
  onChangeText?: (text: string) => void
  isValid?: (valid: boolean) => void
  errorMessage?: string
  returnKeyType?: ReturnKeyTypeOptions
  keyboardType?: KeyboardTypeOptions
  onEndEditing?: () => {}
  allowSpecialChars?: boolean
}

const InputWrapper = styled(View)<{isError: boolean; isFocused: boolean}>`
  padding: 12px 16px;
  background: #f5f8f9;
  border-radius: 12px;
  border: 0.5px solid
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
  padding: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  width: 85%;
  flex: 1;
  text-align: ${() => (useStore.getState().isRTL ? 'right' : 'left')};
  text-decoration: none;
`

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;

  padding-left: 16px;
`

const HorizontalView = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

const LinkContainer = styled(TouchableOpacity)`
  height: 24px;
  justify-content: center;
`

const CustomInput: FC<CustomInputProps> = ({
  label,
  value,
  isPassword,
  schema,
  maxLength = 32,
  onChangeText = () => {},
  isValid = () => {},
  errorMessage = '',
  isDisabled,
  returnKeyType,
  keyboardType,
  onEndEditing,
  allowSpecialChars = false,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>(value)
  const [showPassword, setShowPassword] = useState<boolean>(isPassword || false)
  const {t} = useTranslation()

  useEffect(() => {
    errorMessage && setError(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
    validateInput(inputValue)
  }

  const validateInput = (text: any): void => {
    try {
      if (schema) {
        schema.validateSync(text)
        setError(null)
        isValid(true)
      }
    } catch (err: any) {
      isValid(false)
      setError(err.message)
    }
  }

  const handleChangeText = (text: string): void => {
    if (!allowSpecialChars && !isPassword) {
      text = text.replace(/[^\w]/g, '')
    }
    if (!allowSpecialChars && isPassword) {
      text = text.replace(/[^\S]/g, '')
    }
    setError(null)
    onChangeText(text)
    setInputValue(text)
  }

  return (
    <>
      <InputWrapper isError={!!error} isFocused={isFocused}>
        <InputLabel variant={TEXT_VARIANTS.label} isFocused={isFocused}>
          {label}
        </InputLabel>
        <HorizontalView>
          <Input
            maxLength={maxLength}
            ref={inputRef}
            value={inputValue}
            onChangeText={handleChangeText}
            placeholder={isFocused ? '' : '-'}
            onFocus={handleFocus}
            secureTextEntry={showPassword}
            onBlur={handleBlur}
            cursorColor={'#8c8a86'}
            selectionColor={'#8c8a86'}
            returnKeyType={returnKeyType}
            editable={isDisabled}
            keyboardType={keyboardType}
            onSubmitEditing={onEndEditing}
            {...rest}
          />
          {isPassword && (
            <LinkContainer onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye /> : <EyeClosed />}
            </LinkContainer>
          )}
        </HorizontalView>
      </InputWrapper>
      {error && <ErrorText>{formatSentence(t(error))}</ErrorText>}
    </>
  )
}

export default memo(CustomInput)
