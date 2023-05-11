import React, {useEffect, useRef} from 'react'
import {styled} from 'nativewind'
import {Animated, Easing, Dimensions, Platform, View} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import {SaibLogo} from '@Assets'

const SBLayoutView = styled(View)

const windowDimensions = Dimensions.get('window')
const screenDimensions = Dimensions.get('screen')

const windowWidth = windowDimensions.width
const windowHeight = windowDimensions.height

export default function SplashScreens({
  onCompleteAnimation,
}: {
  onCompleteAnimation: Function
}) {
  const logoScale = useRef(new Animated.Value(1)).current
  const logoPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current

  const textOpacity = useRef(new Animated.Value(0)).current
  const textPosition = useRef(new Animated.ValueXY({x: -60, y: 0})).current

  useEffect(() => {
    SplashScreen.hide()

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoPosition, {
          toValue: {
            x: windowWidth / 2 - windowWidth + 50,
            y:
              windowHeight / 2 -
              windowHeight +
              (Platform.OS === 'ios' ? 120 : 80),
          },
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
          toValue: {x: 35, y: Platform.OS === 'ios' ? 86 : 35},
          duration: 500,
          easing: Easing.elastic(0.5),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onCompleteAnimation()
    })
  }, [logoPosition, logoScale, onCompleteAnimation, textOpacity, textPosition])

  console.log(
    windowDimensions,
    'windowDimensions',
    windowWidth,
    windowHeight,
    Platform.OS,
  )
  console.log(screenDimensions, 'screenDimensions', Platform.OS)

  return (
    <SBLayoutView className="flex-1 px-5 py-5">
      <Animated.Text
        style={{
          opacity: textOpacity,
          transform: [...textPosition.getTranslateTransform()],
        }}
        className="absolute ml-16 mt-4 dark:text-white text-gray-700 text-2xl font-bold">
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
