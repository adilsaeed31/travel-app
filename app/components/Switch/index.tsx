import React from 'react'
import {Switch} from 'react-native'

const SwitchComponent = ({value = false, onValueChange = () => {}}) => {
  return (
    <Switch
      style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
      onValueChange={onValueChange}
      value={value}
    />
  )
}

export default SwitchComponent
