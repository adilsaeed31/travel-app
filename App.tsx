/**
 * Travel Card React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react'
import {QueryClientProvider} from '@tanstack/react-query'

import {queryClient} from '@Api'
import {MainNavigation} from '@Navigations'
import {AuthProvider, AppProvider} from '@Context'
import {SplashScreen} from '@Screens'

function App(): JSX.Element {
  const [isAppReady, SetIsAppReady] = useState<boolean>(false)

  if (0 && !isAppReady) {
    return <SplashScreen onCompleteAnimation={() => SetIsAppReady(true)} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <MainNavigation />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
