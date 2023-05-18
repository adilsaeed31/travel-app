import React, {useEffect, useState} from 'react'
import {Animated, Dimensions, Easing} from 'react-native'

import {LoginSvg as SvgLoginSvg, Svg3, Svg4, Svg5} from '@Assets'

const screenWidth = Dimensions.get('screen').width

export default function IntroFeature() {
  const [next, setNext] = useState<number>(1)

  const tranAnim1 = new Animated.Value(screenWidth)

  const transIn = () => {
    Animated.timing(tranAnim1, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => transIn())

  return (
    <>
      {next === 1 && (
        <Animated.View
          style={{
            transform: [{translateX: tranAnim1}],
          }}>
          <Svg3
            preserveAspectRatio="none"
            onPress={() => {
              setNext(2)
              transIn()
            }}
          />
        </Animated.View>
      )}
      {next === 2 && (
        <Animated.View
          style={{
            transform: [{translateX: tranAnim1}],
          }}>
          <Svg5
            preserveAspectRatio="none"
            onPress={() => {
              setNext(3)
              transIn()
            }}
          />
        </Animated.View>
      )}
      {next === 3 && (
        <Animated.View
          style={{
            transform: [{translateX: tranAnim1}],
          }}>
          <Svg4
            preserveAspectRatio="none"
            onPress={() => {
              setNext(4)
              transIn()
            }}
          />
        </Animated.View>
      )}
      {next === 4 && (
        <Animated.View
          style={{
            transform: [{translateX: tranAnim1}],
          }}>
          <SvgLoginSvg
            preserveAspectRatio="none"
            onPress={() => {
              setNext(1)
              transIn()
              tranAnim1.resetAnimation()
            }}
          />
        </Animated.View>
      )}
    </>
  )
}
