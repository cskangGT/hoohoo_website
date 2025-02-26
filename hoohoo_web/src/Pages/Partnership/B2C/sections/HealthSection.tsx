import React from 'react';
import styled from 'styled-components';
import i18next from '../../../../lang/i18n';
import Community from '../../components/Community';
const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
function HealthSection() {
  const data: any = i18next.t('community', {returnObjects: true});
  return <Community data={data[1]} index={1} imageWidth={'80%'}></Community>;
}

export default HealthSection;
