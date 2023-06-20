import React, {FC, memo, useEffect, useState} from 'react'
import {Platform, Keyboard, TouchableOpacity} from 'react-native'
import Text from '../TextView'
import cn from 'classnames'
import {NativeWindStyleSheet} from 'nativewind'
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
    <>
      <StickyButton keyboardHeight={keyboardHeight}>
        <TouchableOpacity
          className={cn({
            'py-4': true,
            'w-full': true,
            'justify-center': true,
            yallowButton: !isDisabled,
            grayButton: isDisabled,
          })}
          onPress={() => {
            if (!isDisabled && onPress) {
              onPress()
            }
          }}
          activeOpacity={isDisabled ? 1 : 0.5}>
          <Text className="text-center">{value}</Text>
        </TouchableOpacity>
      </StickyButton>
    </>
  )
}

const StickyButton = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props => props.keyboardHeight + 'px'};
  left: 0;
  right: 0;
  align-items: center;
`

NativeWindStyleSheet.create({
  styles: {
    yallowButton: {
      backgroundColor: '#f8d03b',
    },

    grayButton: {
      backgroundColor: '#E1E1E1',
    },
  },
})

export default memo(Button)
