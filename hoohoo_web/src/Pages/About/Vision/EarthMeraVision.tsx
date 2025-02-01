import React, {useEffect} from 'react';
import styled from 'styled-components';
import FootContact from '../../../Component/Footer/FootContact';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {BgImage, theme} from '../../../style';
import ValueEMHeroes from './sections/ValueEMHeroes';
import ValueMarquee from './sections/ValueMarquee';
import VisionIntro from './sections/VisionIntro';
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  padding: 30px 0px;
  margin: 20px 10px;
  background-color: rgba(57, 62, 70, 0.25);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
`;

export const ContentBox = styled.div`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 50px;
  -webkit-overflow-scrolling: touch;
`;

export default function EarthMeraVision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BgImage>
        <Wrapper>
          <ContentBox>
            <VisionIntro />
          </ContentBox>
        </Wrapper>
        <ContentBox>
          <ValueMarquee />
        </ContentBox>
        <Wrapper>
          <ContentBox>
            <ValueEMHeroes />
          </ContentBox>
          {/* <ContentBox>
            <ValueUserCount />
          </ContentBox> */}
        </Wrapper>
        {/* <ContentBox>
          <IntroApp />
        </ContentBox>
        <ContentBox>
          <VisionSection />
        </ContentBox>
        <ContentBox key="table" id="table">
          <TakeSteps />
        </ContentBox>
        <BgImage bgcolor="#EFE7DF">
          <Wrapper>
            <SmallTopContentBox>
              <OurMission />
            </SmallTopContentBox>
            <ContentBox id="partners">
              <Partners />
            </ContentBox>
          </Wrapper>
        </BgImage>
        <Wrapper>
          <ContentBox>
            <FlexBox>
              <Realtime />
            </FlexBox>
          </ContentBox>
          <SmallTopContentBox>
            <Heros />
          </SmallTopContentBox>
        </Wrapper> */}
      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}
