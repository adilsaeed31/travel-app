import React from 'react'
import {ListItem as UIKittenListItem} from '@ui-kitten/components'
import styled from 'styled-components/native'
import {useStore} from '@Store'

interface IListItemProps {
  title: string
  description: string
  leftAccessory?: any
  rightAccessory?: any
  // Add any additional props you need
}

const BaseStyledListItem = styled(UIKittenListItem)<any>`
  /* Add any other custom styles */
  flex-direction: ${({isRTL}: any) => (isRTL ? 'row-reverse' : 'row')};
  text-align: ${({isRTL}: any) => (isRTL ? 'right' : 'left')};
`

const StyledListItem = ({...props}) => {
  return <BaseStyledListItem isRTL={useStore.getState().isRTL} {...props} />
}

const TCListItem: React.FC<IListItemProps> = ({
  title,
  description,
  leftAccessory,
  rightAccessory,
}) => {
  return (
    <StyledListItem
      title={title}
      description={description}
      accessoryLeft={leftAccessory}
      accessoryRight={rightAccessory}
      // Pass any other props to the ListItem component
    />
  )
}

export default TCListItem
