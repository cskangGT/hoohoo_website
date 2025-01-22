import i18next from 'i18next';
import React from 'react';
import Community from '../../components/Community';

function TicketeerCarbon() {
  const data: any = i18next.t('TicketeerCarbon', {returnObjects: true});
  return <Community data={data} flip={false}></Community>;
}

export default TicketeerCarbon;
