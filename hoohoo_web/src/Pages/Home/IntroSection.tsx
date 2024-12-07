import React, {useState} from 'react';
import styled from 'styled-components';
import Bubble from '../../Component/Bubble';

import {slideInFromTop} from '../../style';
import LandingB2C from '../LandingPage/LandingB2C';
const SectionContainer = styled.section`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  border-radius: 20px;
  position: relative;
`;
const Inside = styled.div`
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 30px;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-left: 15px;
  }
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-direction: column;
    margin-left: 0;
  }
`;

const IntroSection: React.FC = () => {
  const [isBubble, setIsBubble] = useState<boolean>(true);
  return (
    <React.Fragment>
      <SectionContainer>
        <Inside>
          <LandingB2C />
        </Inside>
      </SectionContainer>
      {isBubble ? <Bubble setIsBubble={setIsBubble} /> : <React.Fragment />}
    </React.Fragment>
  );
};
export default IntroSection;
