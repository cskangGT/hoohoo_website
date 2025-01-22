import i18next from 'i18next';
import React from 'react';
import Community from '../../components/Community';

function YourImpactSection() {
  const data: any = i18next.t('YourImpactSection', {returnObjects: true});
  return <Community data={data} flip={false} />;
}

export default YourImpactSection;
