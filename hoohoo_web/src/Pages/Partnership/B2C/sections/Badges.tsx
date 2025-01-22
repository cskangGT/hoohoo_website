import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../../style';
import Community from '../../components/Community';
const Circle = styled.div`
  width: 700px;
  height: 700px;
  border-radius: 50%;
  position: absolute;
  background-color: ${theme.green};
  top: 120%;
  right: -20%;
  z-index: 1;
  transform: translateY(-50%);
  @media screen and (max-width: 1100px) {
    width: 600px;
    height: 600px;
  }
  @media screen and (max-width: 700px) {
    width: 500px;
    height: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 300px;
    height: 300px;
  }
`;

export default function Badges() {
  const data: any = i18next.t('Badges', {returnObjects: true});
  return (
    <Community data={data} flip={false}>
      <Circle />
    </Community>
  );
}
