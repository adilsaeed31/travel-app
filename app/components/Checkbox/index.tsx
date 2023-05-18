import React, {useState} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'

interface CheckboxProps {
  label: React.ReactElement | string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  margin-bottom: 15px;
`

const CheckboxText = styled.Text`
  margin-left: 8px;
  color: #3f3d36;
`

const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  checked = false,
  onChange = () => {},
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  const handleToggle = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    onChange(newCheckedState)
  }

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <CheckboxContainer>
        <CheckBox checked={isChecked} />
        <CheckboxText>{label}</CheckboxText>
      </CheckboxContainer>
    </TouchableWithoutFeedback>
  )
}

interface CheckBoxProps {
  checked: boolean
}

const CheckBox = styled.View<CheckBoxProps>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({checked}) => (checked ? '#F8D03B' : 'transparent')};
  border-width: 1px;
  border-color: #131109;
`

export default Checkbox
