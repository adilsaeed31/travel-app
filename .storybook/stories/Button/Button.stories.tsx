import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import TCButton from '../../../app/components/Button'

export default {
  title: 'components/TCButton',
  component: TCButton,
} as ComponentMeta<typeof TCButton>

export const Basic: ComponentStory<typeof TCButton> = args => (
  <TCButton {...args} />
)

Basic.args = {
  children: 'Click Me',
  varient: 'primary',
  'background-color': 'primary',
  RippleColor: 'white',
  onPress: () => console.log('clicked'),
} as any
