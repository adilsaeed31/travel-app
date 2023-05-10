import React from 'react'
import {Text} from 'react-native'

import {styled} from 'styled-components/native'

// import {isRTL} from '@Utils'
import {useStore} from '@Store'

const StyledTextView = styled(Text)`
  font-size: 16px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  ${props => props}
`

const TextView = ({children}) => {
  return (
    <StyledTextView isRTL={useStore.getState().isRTL}>
      {children}
    </StyledTextView>
  )
}

export default TextView
