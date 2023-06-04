import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import TCDot from '../../../app/components/Intro/Dot'

export default {
  title: 'components/IntroDot',
  component: TCDot,
} as ComponentMeta<typeof TCDot>

export const Basic: ComponentStory<typeof TCDot> = args => <TCDot {...args} />

Basic.args = {
  isActive: true,
}
