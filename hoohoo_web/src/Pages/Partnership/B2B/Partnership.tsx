import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage } from '../../../style';
import DataOffer from './DataOffer';
import PartnershipIntro from './PartnershipIntro';
import ESG from './ESG';
import Community from '../B2C/Community';
import UsingB2C from './UsingB2C';
import Solutions from './Solutions';
import B2BVideo from './B2BVideo';
import HowWork from './HowWork';
const ContentBox = styled.section`
    justify-content: center;
  width: 100%;
  display: flex;
`;
function Partnership() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <BgImage>
          <PartnershipIntro />
          <ContentBox>
            <ESG />
          </ContentBox>
          <ContentBox>
            <DataOffer />
          </ContentBox>
          <ContentBox>
            <HowWork></HowWork>
          </ContentBox>
          <ContentBox>
           <UsingB2C />
          </ContentBox>
          <ContentBox>
            <Solutions /> 
          </ContentBox>
          <ContentBox>
            <B2BVideo />
          </ContentBox>
        </BgImage>
    )
}
export default Partnership