import React from 'react'
import {styled} from 'nativewind'
import {useTranslation} from 'react-i18next'
import {Layout, TCButton as Button, TCTextView as Text} from '@Components'
import {TEXT_VARIANTS} from '@Utils'

function PersonalIdScreen() {
  const {t} = useTranslation()

  return (
    <Layout>
      <Button>
        <Text variant={TEXT_VARIANTS.body}>{t('continue')}</Text>
      </Button>
    </Layout>
  )
}

export default PersonalIdScreen
