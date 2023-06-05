import React, {memo} from 'react'
import {ScrollView} from 'react-native'

import {UserTravelCard} from '@Components'

type TravelCardScreenProps = {
  data?: object
}

const TravelCardScreen: React.FC<TravelCardScreenProps> = () => {
  return (
    <ScrollView>
      <UserTravelCard />
    </ScrollView>
  )
}

export default memo(TravelCardScreen)
