import React from 'react'

import {Layout as AppLayout, TabBar} from '@Components'

export default function DashboardFeature() {
  return (
    <AppLayout hasDashboardLayout>
      <TabBar />
    </AppLayout>
  )
}
