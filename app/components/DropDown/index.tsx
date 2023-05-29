import React, {useContext, useEffect} from 'react'
import {
  View,
  Pressable,
  Dimensions,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {Forward} from '@Assets'
import {TEXT_VARIANTS} from '@Utils'
import TCTextView from '../TextView'
import BottomSheet from 'reanimated-bottom-sheet'
import {Search} from '@Assets'

const DropDownInput = styled(Pressable)<{
  isRTL: boolean
  hasError: boolean
  disabled: boolean
}>`
  height: 70px;
  width: 100%;
  margin-right: 32px;
  margin-left: 32px;
  align-self: center;
  border-radius: 12px;
  justify-content: center;
  padding: 12px 16px;
  border: 1px solid
    ${props => (props.hasError ? '#F54D3F' : 'rgba(60, 60, 60, 0.4)')};
  border-color: ${props => (props.hasError ? 'red' : 'rgba(60, 60, 60, 0.4)')};
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  justify-content: space-between;
  background: ${props => (props.disabled ? '#fcfcfc' : '#fcfcfc')};
`
const ArrowIconWrapper = styled(View)<{isRTL: boolean}>`
  justify-content: center;
  transform: rotate(180deg);
  transform: ${props => (!props.isRTL ? 'rotate(360deg)' : 'rotate(180deg)')};
`
const Label = styled(TCTextView)`
  color: #98a4a6;
  opacity: 0.5;
  font-weight: 400;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`
const Value = styled(TCTextView)<{isRTL: boolean}>`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  color: #333333;
`
const ErrorText = styled(TCTextView)`
  color: #f85e5e;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`
const LabelValueWrapper = styled(View)<{hasValue: boolean}>`
  justify-content: ${props => (props.hasValue ? 'center' : 'center')};
`
interface IDropDownProps {
  label: string
  toogleClick: () => void
  value: string | null
  error: string
  isOpen?: boolean
  disabled?: boolean
  title?: string | null
  subTitle?: string | null
  renderConten: React.ReactNode
  hasSearch?: boolean
  searchValue?: string
  onSearchChange?: (e: React.SetStateAction<string>) => void
  onSheetClose: () => void
}
const SheetFirstSnap = Dimensions.get('window').height / 1.8
const SheetSecondSnap = Dimensions.get('window').height / 1.8

export default function DropDown({
  label = '',
  toogleClick,
  value,
  error = '',
  disabled = false,
  isOpen = false,
  title = '',
  subTitle = '',
  renderConten,
  hasSearch,
  searchValue,
  onSearchChange = () => {},
  onSheetClose,
}: IDropDownProps) {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const sheetRef = React.useRef(null)
  useEffect(() => {
    sheetRef?.current?.snapTo(isOpen ? 1 : 3)
  }, [isOpen])
  const renderContent = () => {
    return (
      <SheetContentWrapper>
        <OneFlexView>
          <ToNotch />
          <Title isRTL={!!isRTL}>{title}</Title>
          <Subtitle isRTL={!!isRTL}>{subTitle}</Subtitle>
          {hasSearch && (
            <InputWrapper>
              <Search />
              <InputView
                selectionColor={'black'}
                value={searchValue}
                onChangeText={(e: React.SetStateAction<string>) => {
                  onSearchChange(e)
                }}
              />
            </InputWrapper>
          )}
          {renderConten}
        </OneFlexView>
      </SheetContentWrapper>
    )
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback onPress={onSheetClose}>
          <Backdrop />
        </TouchableWithoutFeedback>
        <BottomSheet
          enabledGestureInteraction
          ref={sheetRef}
          snapPoints={[SheetFirstSnap, SheetSecondSnap, 0]}
          borderRadius={10}
          renderContent={renderContent}
          onCloseEnd={onSheetClose}
        />
      </Modal>

      <DropDownInput
        disabled={disabled}
        hasError={!!error?.length}
        isRTL={!!isRTL}
        onPress={toogleClick}>
        <LabelValueWrapper hasValue={!!value}>
          <Label>{label}</Label>
          {value && (
            <Value variant={TEXT_VARIANTS.caption} isRTL={!!isRTL}>
              {value}
            </Value>
          )}
        </LabelValueWrapper>
        <ArrowIconWrapper isRTL={!!isRTL}>
          <Forward />
        </ArrowIconWrapper>
      </DropDownInput>
      {error?.length ? <ErrorText>{error}</ErrorText> : null}
    </>
  )
}

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
  height: ${SheetFirstSnap};
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
  padding-right: 5px;
  padding-left: 5px;
`
