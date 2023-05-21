import React, {useContext, useEffect, useRef} from 'react'
import {Animated, View, Dimensions} from 'react-native'

import {TCTextView, Layout as AppLayout} from '@Components'
import {AppContext, AppProviderProps} from '@Context'

export default function AuthFeature() {
  const {isAppReady, hasIntroSeen} = useContext<AppProviderProps>(AppContext)
  const splashAnim = useRef(new Animated.Value(0)).current
  const transAnim = useRef(
    new Animated.ValueXY({x: Dimensions.get('screen').width, y: 0}),
  ).current

  useEffect(() => {
    // Added the fade opacity animation for 1 sec
    Animated.parallel([
      Animated.timing(splashAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(transAnim, {
        toValue: {x: 0, y: 0},
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [splashAnim, transAnim, isAppReady, hasIntroSeen])

  return (
    <Animated.View
      style={{
        opacity: splashAnim,
        transform: [...transAnim.getTranslateTransform()],
      }}
      className="flex-1">
      <AppLayout>
        <View className="flex-1 items-center justify-center">
          <TCTextView className="text-slate text-4xl dark:text-tc-primary">
            Login
          </TCTextView>
        </View>
      </AppLayout>
    </Animated.View>
  )
}
