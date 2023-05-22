import React, {lazy, Suspense, useContext} from 'react'
import {StatusBar, ActivityIndicator} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'

import {AuthContext, AppContext} from '@Context'

// Importing app and auth screen based on condition with lazy
// to reduce the app loading size and enhance the performance
const AuthNavigator = lazy(() => import('./AuthNavigator'))
const AppNavigator = lazy(() => import('./AppNavigator'))

const MainNavigation = () => {
  const {user} = useContext(AuthContext)
  const {mode} = useContext(AppContext)

  return (
    <>
      <StatusBar />

      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider
          {...eva}
          theme={mode === 'dark' ? eva.dark : eva.light}>
          <Suspense fallback={<ActivityIndicator />}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </Suspense>
        </ApplicationProvider>
      </NavigationContainer>
    </>
  )
}

export default MainNavigation
