import i18next from 'i18next';
import React from 'react';
import Community from '../../components/Community';
function Rewards() {
  const data: any = i18next.t('rewards', {returnObjects: true});
  return <Community data={data} imageWidth={'60%'} />;
}
export default Rewards;
