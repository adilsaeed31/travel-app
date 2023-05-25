import React, {useContext} from 'react'
import {Text, View, Pressable} from 'react-native'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {Forward} from '@Assets'
import {Colors, TEXT_VARIANTS} from '@Utils'
import {TCTextView} from '@Components'

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
  background: ${props => (props.disabled ? '#E1E1E1' : '#fcfcfc')};
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
  disabled?: boolean
}
export default function DropDown({
  label = '',
  toogleClick,
  value,
  error = '',
  disabled = false,
}: IDropDownProps) {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <>
      <DropDownInput
        disabled={disabled}
        hasError={!!error?.length}
        isRTL={!!isRTL}
        onPress={toogleClick}>
        <LabelValueWrapper hasValue={!!value}>
          <Label>{label}</Label>
          {value && (
            <Value varient={TEXT_VARIANTS.caption} isRTL={!!isRTL}>
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
