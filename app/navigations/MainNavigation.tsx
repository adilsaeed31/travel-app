import React, {lazy, Suspense} from 'react'
import {StatusBar, ActivityIndicator, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Animated, {SlideInRight} from 'react-native-reanimated'

import {useStore} from '@Store'

// Importing app and auth screen based on condition with lazy
// to reduce the app loading size and enhance the performance
const AuthNavigator = lazy(() => import('./AuthNavigator'))
const AppNavigator = lazy(() => import('./AppNavigator'))

const MainNavigation = () => {
  const user = useStore(state => state.user)

  return (
    <SafeAreaProvider className="flex-1">
      <StatusBar />

      <NavigationContainer>
        <Suspense
          fallback={
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" />
            </View>
          }>
          {user ? (
            <Animated.View className="flex-1" entering={SlideInRight}>
              <AppNavigator />
            </Animated.View>
          ) : (
            <AuthNavigator />
          )}
        </Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default MainNavigation
