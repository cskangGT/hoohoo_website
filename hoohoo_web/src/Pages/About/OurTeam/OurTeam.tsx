import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage, theme } from '../../../style';
import Gallery from './Gallery';
import Mindset from './Mindset';
import Strength from './Strength';
import TeamIntro from './TeamIntro';
import TeamProfiles from './TeamProfiles';

import FootContact from '../../../Component/Footer/FootContact';
const ContentBox = styled.section`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
`;
const WhiteBlankGap = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
`;
function OurTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BgImage>
        <TeamIntro />
        <BgImage bgcolor="#393E46">
          <Wrapper>
            <ContentBox>
              <Strength />
            </ContentBox>
          </Wrapper>
        </BgImage>
        <WhiteBlankGap></WhiteBlankGap>
        <BgImage bgcolor="#212937">
          <Wrapper>
            <ContentBox>
              <Mindset />
            </ContentBox>
          </Wrapper>
        </BgImage>

        <Wrapper>
          <ContentBox>
            <TeamProfiles />
          </ContentBox>
          <ContentBox>
            <Gallery />
          </ContentBox>
        </Wrapper>
      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}
export default OurTeam;
