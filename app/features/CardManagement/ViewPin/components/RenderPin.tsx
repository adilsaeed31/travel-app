import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {TCTextView as Text} from '@Components'
import styled from 'styled-components/native'
import Animated, {FlipInXUp} from 'react-native-reanimated'
const pinPlaceholder = ['*', '*', '*', '*']
const animationTime = 600
const RenderPin = ({
  values = [],
  onCompleteAutoDisplay = () => {},
  showPin = false,
}) => {
  const [animaatedTime, setAnimatedTime] = useState(0)
  const [activeShownPin, setActiveShownPin] = useState(0)
  const [pins, setPins] = useState(pinPlaceholder)
  useEffect(() => {
    if (showPin) {
      setAnimatedTime(0)
      setActiveShownPin(0)
    }
  }, [showPin])

  useEffect(() => {
    if (!values?.length) return
    let interval = setInterval(() => {
      let newPin = [...pinPlaceholder]
      newPin[activeShownPin] = values[activeShownPin]
      setPins(newPin)
      setActiveShownPin(activeShownPin == 3 ? 0 : activeShownPin + 1)
      if (activeShownPin == 3) {
        setAnimatedTime(animaatedTime + 1)
      }
    }, animationTime)
    if ((showPin && animaatedTime == 1) || (!showPin && animaatedTime > 1)) {
      setTimeout(() => {
        clearInterval(interval)
        setPins([...pinPlaceholder])
        if (!values?.length) return
        onCompleteAutoDisplay()
      }, animationTime)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeShownPin, animaatedTime, showPin, values])

  return (
    <>
      <View className="flex-row mt-2 justify-center items-center">
        {Array.from({length: 4}).map((item, i) => (
          <>
            <Animated.View key={pins[i]} entering={FlipInXUp.duration(100)}>
              <Text className="font-bold text-4xl">{pins[i]}</Text>
            </Animated.View>
          </>
        ))}
      </View>
    </>
  )
}
export default RenderPin
