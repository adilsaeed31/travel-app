import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {AddNew} from '@Assets'
import {TCTextView} from '@Components'

const AddNewCard = () => {
  return (
    <View className="flex-1 w-64 h-36 justify-center bg-tc-card rounded-2xl">
      <TouchableOpacity className="items-center" onPress={() => {}}>
        <AddNew />
        <TCTextView className="font-tc-light text-sm">Add New Card</TCTextView>
      </TouchableOpacity>
    </View>
  )
}

export default AddNewCard
