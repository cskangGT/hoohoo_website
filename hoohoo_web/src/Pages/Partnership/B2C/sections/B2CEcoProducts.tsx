import React from 'react';
import i18next from '../../../../lang/i18n';
import Community from '../../components/Community';

function B2CEcoProducts() {
  const data: any = i18next.t('B2CEcoProducts', {returnObjects: true});
  return <Community data={data} flip={false} />;
}

export default B2CEcoProducts;
