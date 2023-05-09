import React, {memo} from 'react'

import {ButtonGroup, Button} from '@ui-kitten/components'

const buttonStyle = {
  marginTop: 40,
}

type AppContextButtonProps = {
  mode: string
  language: string
  direction: string
  changeMode: () => void
  changeLanguage: () => void
  changeDirection: () => void
}

const AppContextButtons = ({
  mode,
  language,
  direction,
  changeMode,
  changeLanguage,
  changeDirection,
}: AppContextButtonProps) => {
  console.log('re-render')
  return (
    <ButtonGroup style={buttonStyle}>
      <Button onPress={changeMode}>
        {`${mode === 'light' ? 'dark' : 'light'}`.toUpperCase()}
      </Button>
      <Button onPress={changeDirection}>
        {`${direction === 'rtl' ? 'ltr' : 'rtl'}`.toUpperCase()}
      </Button>
      <Button onPress={changeLanguage}>
        {`${language === 'en' ? 'ar' : 'en'}`.toUpperCase()}
      </Button>
    </ButtonGroup>
  )
}

export default memo(AppContextButtons)
