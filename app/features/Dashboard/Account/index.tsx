import React, {memo} from 'react'
import {ScrollView, View} from 'react-native'
import Animated, {FadeInRight} from 'react-native-reanimated'

import {QuickActions, UserAccountCardView} from '@Components'
import ListViewItem from './ListViewItem'
import {FaceIcon} from '@Assets'

type AccountScreenScreenProps = {
  data?: object
}

const AccountScreen: React.FC<AccountScreenScreenProps> = () => {
  return (
    <ScrollView style={{height: '100%', width: '100%'}}>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserAccountCardView />
      </Animated.View>
      <View style={{flex: 1, flexGrow: 0.8}}>
        <QuickActions />
      </View>
      <View style={{flex: 2, marginBottom: 60}}>
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card Fees *2395'}
          subtitle={'12 Feb, 13:00'}
          number={'-100000'}
        />
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card debit *3395'}
          subtitle={'12 Feb, 13:00'}
          number={'-100000'}
        />
        <ListViewItem
          icon={<FaceIcon />}
          title={'Card credit *3398'}
          subtitle={'12 Feb, 13:00'}
          number={'12000'}
        />
      </View>
    </ScrollView>
  )
}

export default memo(AccountScreen)
