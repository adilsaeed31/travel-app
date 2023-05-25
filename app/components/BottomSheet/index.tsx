import React, {useContext, useEffect} from 'react'
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  TextInput,
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import styled from 'styled-components/native'
import {} from '@Utils'
import {Setting, Search} from '@Assets'
import {TCTextView} from '@Components'

import {AppContext, AppProviderProps} from '@Context'
const SheetFirstSnap = Dimensions.get('window').height / 1.8
const SheetSecondSnapPoint = Dimensions.get('window').height / 1.8

const Title = styled(TCTextView)<{isRTL: boolean}>`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  margin-top: 24px;
`
const Subtitle = styled(TCTextView)<{isRTL: boolean}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;

  color: #9f9fa7;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  margin-bottom: 16px;
`
const ToNotch = styled(View)`
  width: 40px;
  height: 5px;
  align-self: center;

  background: #e6e6e6;
  border-radius: 100px;
`

const Backdrop = styled(View)`
  background-color: gray;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`
const SheetContentWrapper = styled(View)`
  background-color: white;
  padding: 16px;
  height: ${SheetSecondSnapPoint};
`
const OneFlexView = styled(View)`
  flex: 1;
`
const InputWrapper = styled(View)`
  height: 48px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  flex-direction: row;
`
const InputView = styled(TextInput)`
  flex: 1;
`
interface IBottomSheetProps {
  isOpen: boolean
  onBackDropPressed: () => void
  onItemSelect: (item: string) => void
  onCloseEnd: () => void
  title: string
  data: string[]
  subTitle: string
  renderConten: React.ReactNode
  hasSearch?: boolean
  searchValue?: string
  onSearchChange?: (e: React.SetStateAction<string>) => void
}
export default function App({
  isOpen = true,
  onBackDropPressed,
  onCloseEnd,
  title,
  subTitle,
  renderConten,
  hasSearch,
  searchValue,
  onSearchChange = () => {},
}: IBottomSheetProps) {
  const sheetRef = React.useRef(null)
  useEffect(() => {
    sheetRef?.current?.snapTo(isOpen ? 1 : 3)
  }, [isOpen])
  const {isRTL} = useContext<AppProviderProps>(AppContext)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        sheetRef?.current?.snapTo(1)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        sheetRef?.current?.snapTo(0)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])
  const renderContent = () => (
    <SheetContentWrapper>
      <OneFlexView>
        <ToNotch />
        <Title isRTL={!!isRTL}>{title}</Title>
        <Subtitle isRTL={!!isRTL}>{subTitle}</Subtitle>
        {hasSearch && (
          <InputWrapper>
            <Search />
            <InputView
              value={searchValue}
              onChangeText={(e: React.SetStateAction<string>) => {
                onSearchChange(e)
              }}
            />

            <Setting />
          </InputWrapper>
        )}
        {renderConten}
      </OneFlexView>
    </SheetContentWrapper>
  )

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback onPress={onBackDropPressed}>
          <Backdrop />
        </TouchableWithoutFeedback>
        <BottomSheet
          enabledGestureInteraction
          ref={sheetRef}
          snapPoints={[SheetFirstSnap, SheetSecondSnapPoint, 0]}
          borderRadius={10}
          renderContent={renderContent}
          onCloseEnd={onCloseEnd}
        />
      </Modal>
    </>
  )
}
