import React, {useEffect} from 'react';
import styled from 'styled-components';
import FootContact from '../../../components/Footer/FootContact';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {BgImage, slideInFromTop, theme} from '../../../style';

import HowDoesItWork from './sections/HowDoesItWork';
import SeeTTHistory from './sections/SeeTTHistory';
import TicketeerCarbon from './sections/TicketeerCarbon';
import TicketeerIntro from './sections/TicketeerIntro';
import TicketeerSteps from './sections/TicketeerSteps';
const ContentBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
  display: flex;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  @media screen and (max-width: 1200px) {
    height: auto;
  }
`;
const NoHeight = styled.div`
  display: flex;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-bottom: 60px;
`;
export default function EMTicketeer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <Wrapper>
        <TicketeerIntro />
        <NoHeight>
          <TicketeerCarbon />
        </NoHeight>
        <NoHeight>
          <TicketeerSteps />
        </NoHeight>
        <NoHeight>
          <HowDoesItWork />
        </NoHeight>
      </Wrapper>
      <NoHeight>
        <SeeTTHistory />
      </NoHeight>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </BgImage>
  );
}
