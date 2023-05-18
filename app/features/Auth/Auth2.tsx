import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {TCTextView, Layout as AppLayout} from '@Components'

export default function AuthFeature2({navigation}: any) {
  return (
    <AppLayout>
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <TCTextView className="text-slate dark:text-tc-primary">
            Register
          </TCTextView>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}
