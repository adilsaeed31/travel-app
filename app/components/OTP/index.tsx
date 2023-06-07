/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react'
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'
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
  resetCount?: number
  finishTimer?: number
  onChangeText?: (otp: string) => void
  onTimerComplete?: () => void
}

const otpMaxLength = 4

const OtpEnter: React.FC<OtpInputProps> = ({
  value = '',
  resetCount = 0,
  finishTimer = 0,
  onTimerComplete = () => {},
  onChangeText = () => {},
}) => {
  const [otp, setOtp] = useState<string>(value)

  useEffect(() => {
    if (onChangeText) {
      onChangeText(otp)
    }
  }, [otp])

  useEffect(() => {
    setOtp(value)
  }, [value])

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const inputRefs = useRef<TextInput[]>([])

  const handleTextChange = (index: number, text: string) => {
    let newOtp = otp.slice(0, index) + text + otp.slice(index)
    setOtp(newOtp)

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      setOtp(otp.slice(0, otp.length - 1))
      if (otp.length > 0 || otp.length < 4) {
        inputRefs.current[otp.length - 1]?.focus()
      }
    }
  }

  const handleRefAssign = (ref: TextInput | null, index: number) => {
    if (ref) {
      inputRefs.current[index] = ref
    }
  }

  useEffect(() => {
    setOtp('')
  }, [resetCount])

  return (
    <>
      <OtpContainer>
        {Array.from({length: otpMaxLength}).map((_, index) => (
          <OtpInput
            key={index}
            value={otp[index] || ''}
            onChangeText={(text: string) => handleTextChange(index, text)}
            onKeyPress={(
              event: NativeSyntheticEvent<TextInputKeyPressEventData>,
            ) => handleKeyPress(event)}
            ref={(ref: TextInput | null) => handleRefAssign(ref, index)}
            keyboardType="numeric"
            maxLength={1}
            cursorColor={'transparent'}
            selectionColor={'transparent'}
          />
        ))}
      </OtpContainer>
      <Timer
        seconds={60}
        onTimerComplete={onTimerComplete}
        resetCount={resetCount}
        finishTimer={finishTimer}
      />
    </>
  )
}

export default OtpEnter
