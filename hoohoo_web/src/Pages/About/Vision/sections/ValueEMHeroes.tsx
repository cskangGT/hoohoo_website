import i18next from 'i18next';
import React from 'react';
import Community from '../../../Partnership/components/Community';

function ValueEMHeroes() {
  const data: any = i18next.t('ValueEMHeroes', {returnObjects: true});
  return <Community data={data} />;
}

export default ValueEMHeroes;
