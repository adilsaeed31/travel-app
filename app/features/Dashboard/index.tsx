import React from 'react'

import {Layout as AppLayout, TabBar} from '@Components'

import TravelCard from './TravelCard'
import Account from './Account'

export default function DashboardFeature() {
  return (
    <AppLayout hasDashboardLayout>
      <TabBar left={<TravelCard />} right={<Account />} />
    </AppLayout>
  )
}
