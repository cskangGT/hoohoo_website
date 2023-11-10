import React from 'react';
import styled from 'styled-components';
import { slideInFromTop } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import TwoColBoxesSection from '../../../Component/ContentBox/TwoColBoxesSection';
const Bg = styled.div`
  width:calc(100%);
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
  @media screen and (max-width: 500px){
    height: auto;
  }
`;

function PlatformIntro() {
    
    const data : any = i18next.t('platform1p', { returnObjects: true });
    return (
        <Bg>
            <Wrapper>
                <TwoColBoxesSection data={data} rightImage={true} descStyle={{color: 'white', fontSize: 24}}
                    headerStyle={{color:'white'}} />
            </Wrapper>
        </Bg>
    )
}
export default PlatformIntro;