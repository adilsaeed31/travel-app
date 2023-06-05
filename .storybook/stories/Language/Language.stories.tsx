import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import IntroLang from '../../../app/components/Intro/IntroLang'

export default {
  title: 'components/TCLanguage',
  component: IntroLang,
} as ComponentMeta<typeof IntroLang>

export const Basic: ComponentStory<typeof IntroLang> = args => <IntroLang />
