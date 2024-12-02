import React from 'react'
import Community from './Community'
import i18next from 'i18next';

function YouImpactSection () {
    const data: any = i18next.t('YouImpactSection', {returnObjects: true});
  return (
    <Community data={data} flip={false} />
  )
}

export default YouImpactSection