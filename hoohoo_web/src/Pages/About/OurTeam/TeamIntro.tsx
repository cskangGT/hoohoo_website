import React, { useState,useEffect } from 'react'
import { Bg } from '../Vision/VisionIntro'
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { theme } from '../../../style';
export const BackgroundImage = styled(Bg)`
  margin: 200px 0;
  height: 700px;
  @media screen and (max-width: 700px) {
    align-items: center;
        height: 800px;
        margin: 82px 0;
    }
`;
export const IntroHeaderTextContainer = styled.div`
  @media screen and (max-width: 700px) {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
`;
export default function TeamIntro() {

    const data : any = i18next.t('em_team_Intro', { returnObjects: true });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <BackgroundImage image='Images/teamIntroImg.png'>
        <Wrapper>
          <IntroHeaderTextContainer>
            <LinedHeader data={{header: data.header}} style={{fontSize: isMobile? '3rem': '5rem', color: theme.white, textAlign:'left'}}/>
          </IntroHeaderTextContainer>
        </Wrapper>
    </BackgroundImage>
  )
}