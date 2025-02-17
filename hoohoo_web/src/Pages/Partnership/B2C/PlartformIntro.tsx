import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import TwoColBoxesSection from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { slideInFromTop } from '../../../style';
const Bg = styled.div`
  width: calc(100%);
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  background-image: url('Images/platform1pbg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; // 필요한 경우 추가
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;

function PlatformIntro() {
  const data: any = i18next.t('platform1p', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <TwoColBoxesSection
          data={data}
          rightImage={true}
          descStyle={{color: 'white', fontSize: 24}}
          headerStyle={{color: 'white'}}
        />
      </Wrapper>
    </Bg>
  );
}
export default PlatformIntro;
