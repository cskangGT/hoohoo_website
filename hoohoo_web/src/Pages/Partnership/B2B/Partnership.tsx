import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage, theme } from '../../../style';
import DataOffer from './DataOffer';
import PartnershipIntro from './PartnershipIntro';
import ESG from './ESG';
import Community from '../B2C/Community';
import UsingB2C from './UsingB2C';
import Solutions from './Solutions';
import B2BVideo from './B2BVideo';
import HowWork from './HowWork';
import FootContact from '../../../Component/Footer/FootContact';
const ContentBox = styled.section`
    justify-content: center;
  width: 100%;
  display: flex;
`;
const Container = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
`;
const ConstructionText = styled.p`
  margin-top: 80px;
  align-self: center;
  color: ${theme.darkGray};
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
function Partnership() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
      <>
        <BgImage>
        <Wrapper>
          <ContentBox>
            <Container>
              <ConstructionText>{"Our partnership will be released soon :)"}</ConstructionText>
            </Container>
          </ContentBox>
          </Wrapper>
          {/* <PartnershipIntro />
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
          </ContentBox> */}
        </BgImage>
        <hr style={{ color: theme.darkGray, margin: 0 }} />
        <FootContact />
        </>
    )
}
export default Partnership