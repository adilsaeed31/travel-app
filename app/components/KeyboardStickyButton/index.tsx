import React, {FC, memo, useEffect, useState} from 'react'
import {Platform, Keyboard} from 'react-native'
import Text from '../TextView'
import styled from 'styled-components/native'

type KeyboardProps = {
  value: string
  onPress?: any
  isDisabled?: boolean
}

const Button: FC<KeyboardProps> = ({value, isDisabled, onPress = () => {}}) => {
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  if (!keyboardHeight) {
    return null
  }
  return (
    <StickyButtonContainer keyboardHeight={keyboardHeight}>
      <StickyButton
        onPress={() => {
          if (!isDisabled && onPress) {
            onPress()
          }
        }}
        isDisabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.5}>
        <Text>{value}</Text>
      </StickyButton>
    </StickyButtonContainer>
  )
}

const StickyButtonContainer = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props =>
    Platform.OS === 'ios' ? props.keyboardHeight + 'px' : '0px'};
  left: 0;
  right: 0;
  align-items: center;
`

const StickyButton = styled.TouchableOpacity<{isDisabled?: boolean}>`
  background-color: ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
  border: 1px solid ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: center;
`

export default memo(Button)
