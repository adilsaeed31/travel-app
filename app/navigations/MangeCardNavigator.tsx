import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
  ManageCardFeature,
  EstatementFeature,
  PdfReaderFeature,
  ViewPinFeature,
} from '@Features'

const {Navigator, Screen} = createStackNavigator()

const MangeCardNavigator = () => (
  <Navigator initialRouteName="MangeCard" screenOptions={{headerShown: false}}>
    <Screen name="MangeCard" component={ManageCardFeature} />
    <Screen name="Estatement" component={EstatementFeature} />
    <Screen name="PdfViewer" component={PdfReaderFeature} />
    <Screen name="ViewPin" component={ViewPinFeature} />
  </Navigator>
)

export default MangeCardNavigator
