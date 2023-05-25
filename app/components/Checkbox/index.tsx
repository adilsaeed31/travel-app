import React, {useState, useContext} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {Check} from '@Assets'
import {AppProviderProps, AppContext} from '@Context'

interface CheckboxProps {
  label: React.ReactElement | string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const CheckboxContainer = styled.View<{isRTL?: boolean}>`
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  align-items: flex-start;
  margin-bottom: 15px;
`

const CheckboxText = styled.Text<{isRTL?: boolean}>`
  ${props => (props.isRTL ? 'margin-right: 8px' : 'margin-left: 8px')};
  ${props => (props.isRTL ? 'text-align: right' : '')};
  color: #3f3d36;
  margin-top: 3px;
`

const CheckBox = styled.View<CheckBoxProps>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({checked}) => (checked ? '#F8D03B' : 'transparent')};
  border-width: 1px;
  border-color: #131109;
  justify-content: center;
  align-items: center;
`

const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  checked = false,
  onChange = (_checked: any) => {},
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const handleToggle = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)

    onChange(newCheckedState)
  }

  return (
    <TouchableWithoutFeedback
      onPress={handleToggle}
      accessibilityRole="checkbox"
      accessibilityState={{checked: isChecked}}>
      <CheckboxContainer isRTL={isRTL}>
        <CheckBox checked={isChecked}>{isChecked && <Check />}</CheckBox>
        <CheckboxText isRTL={isRTL}>{label}</CheckboxText>
      </CheckboxContainer>
    </TouchableWithoutFeedback>
  )
}

interface CheckBoxProps {
  checked: boolean
}

export default Checkbox
