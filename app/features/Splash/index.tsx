import React, {useEffect, useRef} from 'react'
import {styled} from 'nativewind'
import {Animated, Easing} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import {Layout} from '@ui-kitten/components'

import {SaibLogo} from '@Assets'

// Below is the UI kitten component Layout
const SBLayoutView = styled(Layout)

export default function SplashFeature() {
  const logoScale = useRef(new Animated.Value(1)).current
  const logoPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current

  const textOpacity = useRef(new Animated.Value(0)).current
  const textPosition = useRef(new Animated.ValueXY({x: -60, y: 0})).current

  useEffect(() => {
    SplashScreen.hide()

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoPosition, {
          toValue: {x: -140, y: -336},
          duration: 800,
          delay: 500,
          easing: Easing.elastic(0.5),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 0.5,
          duration: 800,
          delay: 500,
          easing: Easing.elastic(0.5),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textPosition, {
          toValue: {x: 35, y: 10},
          duration: 500,
          easing: Easing.elastic(0.5),
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [logoPosition, logoScale, textOpacity, textPosition])

  return (
    <SBLayoutView className="flex-1 px-5 py-5">
      <Animated.Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          opacity: textOpacity,
          transform: [...textPosition.getTranslateTransform()],
        }}
        className="ml-16 mt-4 text-gray-700 text-2xl font-bold">
        Saudi Investment Bank
      </Animated.Text>

      <Animated.View
        className="flex-1 items-center justify-center"
        style={{
          transform: [
            ...logoPosition.getTranslateTransform(),
            {scale: logoScale},
          ],
        }}>
        <SaibLogo />
      </Animated.View>
    </SBLayoutView>
  )
}
