import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {TCTextView, Layout as AppLayout} from '@Components'

export default function AuthFeature({navigation}: any) {
  return (
    <AppLayout>
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity onPress={() => navigation.navigate('Auth2')}>
          <TCTextView className="text-slate dark:text-tc-primary">
            Login
          </TCTextView>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}
