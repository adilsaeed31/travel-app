import React, {useRef, useState} from 'react'
import {Text} from 'react-native'
import BSheet from 'react-native-bottomsheet-reanimated'
import Ripple from 'react-native-material-ripple'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {ChevronUp} from '@Assets'
import {getTransData} from '@Api'

import BottomSheetBody from './BottomSheetBody'

const BottomSheet = () => {
  const {t} = useTranslation()

  const bottomRef = useRef(null)
  const [backDrop, setBackDrop] = useState<boolean>(false)
  const [hasDisplay, setDisplay] = useState<boolean>(false)

  const cardData = useStore(state => state.cardData)
  const activeCardIndex = useStore(state => state.activeCardIndex)
  const enableBottomSheet = useStore(state => state.enableBottomSheet)

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'trans',
      {
        currency:
          cardData?.[activeCardIndex]?.card?.currencies[activeCardIndex]
            ?.currency_code ?? 'SAR',
      },
    ],
    queryFn: ({queryKey}) => getTransData(queryKey),
  })

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
        onChangeSnap={(snap: any) => {
          setBackDrop(snap.index === 1)
          setDisplay(snap.index === 1)
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
          <BottomSheetBody
            data={data}
            error={error}
            isError={isError}
            isLoading={isLoading}
            hasDisplay={hasDisplay}
          />
        }
      />
    )
  } else {
    return null
  }
}

export default BottomSheet
