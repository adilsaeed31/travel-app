import React, {useState, useRef, useEffect} from 'react'
import {TextInput} from 'react-native'
import styled from 'styled-components/native'
import Timer from './Timer'

const OtpContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const OtpInput = styled(TextInput)`
  border: 0.5px solid rgba(60, 60, 60, 0.4);
  padding: 21px 0px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  background-color: #fcfcfc;
  width: 65px;
  border-radius: 12px;
`

interface OtpInputProps {
  value?: string
  onChangeText?: () => any
  onTimerComplete?: () => any
}

const otpMaxLength = 4

const OtpEnter: React.FC<OtpInputProps> = (onTimerComplete, onChangeText) => {
  const [otp, setOtp] = useState('')

  useEffect(() => {
    //onChangeText(otp)
  }, [onChangeText, otp])

  const inputRefs = useRef<TextInput[]>([])

  const handleTextChange = (index: number, text: string) => {
    let newOtp = otp.slice(0, index) + text + otp.slice(index)
    setOtp(newOtp)

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }

    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  //const handleKeyPress = (index: number, event: React.KeyboardEvent) => {}

  const handleRefAssign = (ref: TextInput | null, index: number) => {
    if (ref) {
      inputRefs.current[index] = ref
    }
  }

  return (
    <>
      <OtpContainer>
        {Array.from({length: otpMaxLength}).map((_, index) => (
          <OtpInput
            key={index}
            value={otp[index] || ''}
            onChangeText={(text: string) => handleTextChange(index, text)}
            //onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(index, event)}
            ref={(ref: TextInput | null) => handleRefAssign(ref, index)}
            keyboardType="numeric"
            maxLength={1}
            cursorColor={'#8c8a86'}
            selectionColor={'#8c8a86'}
          />
        ))}
      </OtpContainer>
      <Timer seconds={120} />
    </>
  )
}

export default OtpEnter
