import i18next from 'i18next';
import React from 'react';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import Community from '../B2C/Community';
import {Bg} from './ESG';
export default function UsingB2C() {
  const data: any = i18next.t('usingb2c', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <Community data={data} />
      </Wrapper>
    </Bg>
  );
}
