import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import IntroSkip from '../../../app/components/Intro/IntroSkip'

export default {
  title: 'components/IntroSkip',
  component: IntroSkip,
} as ComponentMeta<typeof IntroSkip>

export const Basic: ComponentStory<typeof IntroSkip> = args => <IntroSkip />
