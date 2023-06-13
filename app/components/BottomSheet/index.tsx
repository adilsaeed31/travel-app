import React, {useRef, useState} from 'react'
import {View} from 'react-native'
import BSheet from 'react-native-bottomsheet-reanimated'
import Ripple from 'react-native-material-ripple'
import {NativeWindStyleSheet} from 'nativewind'
import {useTranslation} from 'react-i18next'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {ChevronUp} from '@Assets'

import TransItem from '../TransItem'
import {default as TCTextView} from '../TextView'

const BottomSheet = () => {
  const {t} = useTranslation()
  const bottomRef = useRef(null)
  const [backDrop, setBackDrop] = useState<boolean>(false)
  const enableBottomSheet = useStore(state => state.enableBottomSheet)
  const transData = useStore(state => state.transData)

  if (enableBottomSheet) {
    return (
      <BSheet
        keyboardAware
        ref={bottomRef}
        isBackDrop={backDrop}
        onChangeSnap={(data: any) => setBackDrop(data.index === 1)}
        initialPosition={'15%'}
        snapPoints={['15%', '80%']}
        isRoundBorderWithTipHeader={true}
        tipStyle={{backgroundColor: Colors.Supernova}}
        header={
          <>
            <Ripple
              rippleColor={Colors.Supernova}
              rippleContainerBorderRadius={16}
              className="-mt-8 self-center">
              <ChevronUp />
            </Ripple>
            <View className="recent-container text-sm text-slate-400">
              <TCTextView>{t('TravelCard:recentTrans')}</TCTextView>
            </View>
          </>
        }
        body={
          <>
            {transData?.map(
              ({
                title,
                amount,
                timestamp,
                currency_code,
                transaction_type,
              }: any) => {
                return (
                  <TransItem
                    title={title}
                    number={amount}
                    subtitle={timestamp}
                    icon={currency_code}
                    type={transaction_type}
                  />
                )
              },
            )}
          </>
        }
      />
    )
  } else {
    return null
  }
}

NativeWindStyleSheet.create({
  styles: {
    'recent-container': {
      marginStart: 16,
    },
  },
})

export default BottomSheet
