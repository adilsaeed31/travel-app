import React, {Suspense, lazy} from 'react'

import {Layout as AppLayout, TabBar} from '@Components'
import {ActivityIndicator} from 'react-native'

const TravelCard = lazy(() => import('./TravelCard'))
const Account = lazy(() => import('./Account'))

const DashboardFeature = () => {
  return (
    <AppLayout isDashboardLayout>
      <TabBar
        left={
          <Suspense fallback={<ActivityIndicator />}>
            <TravelCard />
          </Suspense>
        }
        right={
          <Suspense fallback={<ActivityIndicator />}>
            <Account />
          </Suspense>
        }
      />
    </AppLayout>
  )
}

export default DashboardFeature
