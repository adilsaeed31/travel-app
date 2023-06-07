import React from 'react'
import {Image, ScrollView, View} from 'react-native'

import {Promotion1} from '@Assets'
import {TCTextView} from '@Components'

const Promotions = () => {
  return (
    <View className="mx-6 mt-10">
      <TCTextView className="mb-4">Do more with SAIB</TCTextView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image className="w-80 h-20 mr-2" source={Promotion1} />
        <Image className="w-80 h-20 mr-2" source={Promotion1} />
        <Image className="w-80 h-20 mr-2" source={Promotion1} />
      </ScrollView>
    </View>
  )
}

export default Promotions
