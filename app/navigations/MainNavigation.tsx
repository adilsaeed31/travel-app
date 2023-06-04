import React, {lazy, Suspense} from 'react'
import {StatusBar, ActivityIndicator, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Animated, {SlideInRight} from 'react-native-reanimated'

import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'

import {useStore} from '@Store'

// Importing app and auth screen based on condition with lazy
// to reduce the app loading size and enhance the performance
const SplashNavigator = lazy(() => import('./SplashNavigator'))
const AuthNavigator = lazy(() => import('./AuthNavigator'))
const AppNavigator = lazy(() => import('./AppNavigator'))

const MainNavigation = () => {
  const user = useStore((state: any) => state.user)
  const isAppReady = useStore((state: any) => state.isAppReady)

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <StatusBar />

      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider {...eva} theme={eva.light}>
          <Suspense
            fallback={
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
              </View>
            }>
            {!isAppReady ? (
              <SplashNavigator />
            ) : user ? (
              <Animated.View className="flex-1" entering={SlideInRight}>
                <AppNavigator />
              </Animated.View>
            ) : (
              <Animated.View className="flex-1" entering={SlideInRight}>
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
