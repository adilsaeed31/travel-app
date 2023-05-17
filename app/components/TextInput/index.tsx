import React, {useState} from 'react'
import {TextInput} from 'react-native'
import {styled} from 'styled-components/native'

import {useStore} from '@Store'
import {TCTextView} from '@Components'
import {TEXT_VARIANTS} from '@Utils'

const Label = styled(TCTextView)`
  height: 20px;
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height, or 133% */
  color: #f54d3f;
`
const StyledTextInput = styled(TextInput)<{isRTL: boolean}>`
  text-align: ${({isRTL}) => (isRTL ? 'right' : 'left')};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 8px;
  width: 311px;
  height: 70px;
  background: #fcfcfc;
  border: 0.5px solid rgba(60, 60, 60, 0.4);
  border-radius: 12px;
`

function TCTextInput({
  successCall,
  errorCall,
  validationRegex,
  placeholder,
  isPassword = false,
  errorMessage = 'Invalid input',
  ...rest
}: {
  successCall: (value: string) => void
  errorCall: () => void
  validationRegex: RegExp
  isPassword?: boolean
  errorMessage?: string
  placeholder?: string
}) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const isRTL = useStore.getState().isRTL

  const handleTextChange = (inputText: string) => {
    setText(inputText)

    if (!validationRegex.test(inputText)) {
      setError(errorMessage)
      errorCall()
    } else {
      successCall(inputText)
      setError('')
    }
  }

  return (
    <>
      <StyledTextInput
        {...rest}
        isRTL={isRTL}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={handleTextChange}
        value={text}
      />
      {error && <Label variant={TEXT_VARIANTS.body}>{error}</Label>}
    </>
  )
}

export default TCTextInput
