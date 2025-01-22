import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import Community from '../../components/Community';

const Image = styled.img`
  width: 100%;
`;
function LifeStyleSection() {
  const data: any = i18next.t('community', {returnObjects: true});
  return (
    <Community
      data={data[2]}
      index={2}
      imageComponent={<Image src={data[2].image} />}></Community>
  );
}

export default LifeStyleSection;
