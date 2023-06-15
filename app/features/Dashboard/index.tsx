import React from 'react'

import {Layout as AppLayout, BottomSheet, TabBar} from '@Components'

export default function DashboardFeature() {
  return (
    <AppLayout hasDashboardLayout>
      <TabBar />

      <BottomSheet />
    </AppLayout>
  )
}
