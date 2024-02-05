import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../../style';
import FootContact from '../../../Component/Footer/FootContact';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import AskTicketeer from './AskTicketeer';
import Expect from './Expect';
import HowWorkFirst from './HowWorkFirst';
import HowWorkFourth from './HowWorkFourth';
import HowWorkSecond from './HowWorkSecond';
import HowWorkThird from './HowWorkThird';
import TicketeerIntro from './TicketeerIntro';
import WhatTicketeer from './WhatTicketeer';
const ContentBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
  display: flex;
  @media screen and (max-width: 800px){
      height: auto;
    }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  @media screen and (max-width: 1200px){
      height: auto;
    }
`;
const NoHeight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;
export default function EMTicketeer() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <BgImage>
      <Container>
          <TicketeerIntro></TicketeerIntro>
        </Container>
        <Wrapper>
          <NoHeight>
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
        <hr style={{ color: theme.darkGray, margin: 0 }} />
        <FootContact />
    </BgImage>
    
  )
}
