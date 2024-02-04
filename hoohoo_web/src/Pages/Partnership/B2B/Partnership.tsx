import React, { useEffect, useRef } from 'react';
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
import B2BIntroSection from './B2BIntroSection';
import PhotoVideoes from './PhotoVideoes';
import EMBags from './EMBags';
import GetInTouch from './GetInTouch';
import TicketeerIntro from './TicketeerIntro';
import WhatTicketeer from './WhatTicketeer';
import HowDoesItWork from './HowDoesItWork';
import HowWorkFirst from './HowWorkFirst';
import HowWorkSecond from './HowWorkSecond';
import HowWorkThird from './HowWorkThird';
import HowWorkFourth from './HowWorkFourth';
import AskTicketeer from './AskTicketeer';
import Expect from './Expect';
const ContentBox = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
  width: 100%;
  height: 800px;
  @media screen and (max-width: 1200px){
      height: auto;
    }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  @media screen and (max-width: 800px){
      height: auto;
    }
`;
const NoHeight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;
function Partnership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      
      if (location.hash === '#ticketeer' ){
          setTimeout(() => {
              if (sectionRef.current) {
                  sectionRef.current.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
        
      } else {
          window.scrollTo(0, 0);
      }
    }, [location]);
    return (
      <>
        <BgImage>
        <Wrapper>
          <ContentBox>
              <B2BIntroSection></B2BIntroSection>
              {/* <ConstructionText>{"Our partnership will be released soon :)"}</ConstructionText> */}
          </ContentBox>
        </Wrapper>
        <Container>
          <PhotoVideoes></PhotoVideoes>
        </Container>
        <Container>
          <EMBags></EMBags>
        </Container>
        <Container>
          <GetInTouch />
        </Container>
        <Container>
          <TicketeerIntro></TicketeerIntro>
        </Container>
        <Wrapper>
          <NoHeight ref={sectionRef} id="ticketeer" key="ticketeer">
            <WhatTicketeer ></WhatTicketeer>
          </NoHeight>
          <Container>
            <Expect></Expect>
          </Container>
          <Container>
            <HowWorkFirst />
          </Container>
          <Container>
            <HowWorkSecond></HowWorkSecond>
          </Container>
          <Container>
            <HowWorkThird></HowWorkThird>
          </Container>
          <Container>
            <HowWorkFourth></HowWorkFourth>
          </Container>
          <Container>
            <AskTicketeer></AskTicketeer>
          </Container>
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