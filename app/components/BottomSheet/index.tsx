import React, {useRef, useState} from 'react'
import {View, Text} from 'react-native'
import BSheet from 'react-native-bottomsheet-reanimated'
import Ripple from 'react-native-material-ripple'
import {useTranslation} from 'react-i18next'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {ChevronUp} from '@Assets'

import TransItem from '../TransItem'

const BottomSheet = () => {
  const {t} = useTranslation()

  const bottomRef = useRef(null)
  const [backDrop, setBackDrop] = useState<boolean>(false)
  const [display, setDisplay] = useState<boolean>(false)

  const transData = useStore(state => state.transData)
  const enableBottomSheet = useStore(state => state.enableBottomSheet)

  if (enableBottomSheet) {
    return (
      <BSheet
        keyboardAware
        ref={bottomRef}
        isBackDrop={backDrop}
        initialPosition={'15%'}
        snapPoints={['15%', '80%']}
        isRoundBorderWithTipHeader={true}
        tipStyle={{backgroundColor: Colors.Supernova}}
        onChangeSnap={(data: any) => {
          setBackDrop(data.index === 1)
          setDisplay(data.index === 1)
        }}
        header={
          <>
            <Ripple
              rippleColor={Colors.Supernova}
              rippleContainerBorderRadius={16}
              className="-mt-8 self-center">
              <ChevronUp />
            </Ripple>

            <Text className="-mt-4 text-sm  font-tc-thin text-slate-400">
              {t('TravelCard:recentTrans')}
            </Text>
          </>
        }
        body={
          display ? (
            <>
              {transData?.map(
                (
                  {
                    title,
                    amount,
                    timestamp,
                    currency_code,
                    transaction_type,
                  }: any,
                  index,
                ) => {
                  return (
                    <TransItem
                      key={index}
                      index={index}
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
          ) : (
            <View />
          )
        }
      />
    )
  } else {
    return null
  }
}

export default BottomSheet
