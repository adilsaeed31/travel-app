/**
 * Travel Card React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@Api'
import {MainNavigation} from '@Navigations'
import {AuthProvider, AppProvider} from '@Context'

function App(): JSX.Element {
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
