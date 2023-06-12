import React, {lazy, Suspense, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import Animated, {SlideInRight} from 'react-native-reanimated'
import {StatusBar, ActivityIndicator, View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Splash from 'react-native-splash-screen'

import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'

import {useStore} from '@Store'

import {default as customMapping} from '../utils/theme.json'

// Importing app and auth screen based on condition with lazy
// to reduce the app loading size and enhance the performance
const SplashNavigator = lazy(() => import('./SplashNavigator'))
const AuthNavigator = lazy(() => import('./AuthNavigator'))
const AppNavigator = lazy(() => import('./AppNavigator'))

const MainNavigation = () => {
  const user = useStore(state => state.user)
  const isRTL = useStore(state => state.isRTL)
  const isAppReady = useStore(state => state.isAppReady)

  // changing the layout direction if isRTL true
  const direction = isRTL ? 'rtl' : 'ltr'

  // below is useEffect is only for android devices
  // because isAppReady is true in store on next load
  // app is not going to auth pages
  useEffect(() => {
    if (isAppReady) {
      Splash.hide()
    }
  }, [isAppReady])

  return (
    <SafeAreaProvider
      className="flex-1 bg-white"
      style={{direction: direction}}>
      <StatusBar />

      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider
          {...eva}
          theme={eva.light}
          customMapping={customMapping as any}>
          <Suspense
            fallback={
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
              </View>
            }>
            {!isAppReady ? (
              <SplashNavigator />
            ) : user ? (
              <Animated.View
                className="flex-1"
                entering={SlideInRight.delay(50)}>
                <AppNavigator />
              </Animated.View>
            ) : (
              <Animated.View
                className="flex-1"
                entering={SlideInRight.delay(50)}>
                <AuthNavigator />
              </Animated.View>
            )}
          </Suspense>
        </ApplicationProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default MainNavigation
