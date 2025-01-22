import React from 'react';
import i18next from '../../../../lang/i18n';
import Community from '../../components/Community';

function B2CEcoServices() {
  const data: any = i18next.t('B2CEcoServices', {returnObjects: true});
  return <Community data={data} flip={false} />;
}

export default B2CEcoServices;
