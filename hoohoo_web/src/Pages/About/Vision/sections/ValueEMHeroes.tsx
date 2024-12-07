import React from 'react'
import Community from '../../../Partnership/B2C/Community'
import i18next from 'i18next';

function ValueEMHeroes() {
  const data: any = i18next.t('ValueEMHeroes', {returnObjects: true});
  return (
    <Community data={data} />
  )
}

export default ValueEMHeroes