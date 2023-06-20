import React from 'react'
import {
  Stop,
  ViewPin,
  Statement,
  PhysicalCard,
  ReplaceCard,
  TickCircle,
} from '@Assets'

export const MangeCardList = (t: any, cardActivated: boolean) => {
  return [
    {
      title: cardActivated
        ? t('ManageCard:reactiveCard')
        : t('ManageCard:temporaryStop'),
      icon: cardActivated ? <TickCircle /> : <Stop />,
      route: '',
      key: cardActivated ? 'activate' : 'stop',
    },
    {
      title: t('ManageCard:viewPin') || '',
      icon: <ViewPin />,
      route: 'ViewPin',
      key: 'ViewPin',
    },
    {
      title: t('ManageCard:resetPin'),
      icon: <ViewPin />,
      route: 'home',
      key: 'Estatement',
    },
    {
      title: t('ManageCard:eStatement'),
      icon: <Statement />,
      route: 'Estatement',
      key: 'Estatement',
    },
    {
      title: t('ManageCard:requestPhysicalCard'),
      icon: <PhysicalCard />,
      route: 'home',
      key: 'Estatement',
    },
    {
      title: t('ManageCard:replaceCard'),
      icon: <ReplaceCard />,
      route: 'Estatement',
      key: 'Estatement',
    },
  ]
}
