import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Wrapper from '../../../../components/Wrapper/Wrapper';
import {theme} from '../../../../style';
import {logButtonEvent, PageName} from '../../../../util/firebase_custom_event';
import {Bg} from '../../../About/Vision/sections/VisionIntro';
import {HomeTransitionButton} from '../../../Home/styles';
const BackgroundImage = styled(Bg)`
  margin: 80px 0;
  height: 700px;

  @media screen and (max-width: 700px) {
    align-items: center;
    height: 800px;
    margin: 82px 0;
  }
  @media screen and (max-width: 500px) {
    align-items: center;
    height: 600px;
    margin: 82px 0;
  }
`;
const IntroHeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Header = styled.h1`
  font-size: 3.5rem;
  color: ${theme.white};
  text-align: left;
  font-weight: 600;
  margin: 0px;
  line-height: 1.1;
  white-space: pre-line;
  @media screen and (max-width: 600px) {
    text-align: center;
    line-height: 1.5;
    font-size: 2rem;
  }
`;
const CorpButton = styled(HomeTransitionButton)`
  font-size: 1.25rem;
  padding: 12px 30px;
  @media screen and (max-width: 600px) {
    margin-top: 30px;
    padding: 8px 20px;
  }
`;
export default function CorpIntro() {
  const localizedText: any = i18next.t('CorpIntro', {returnObjects: true});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleEmailClick = () => {
    logButtonEvent('ask_partnership in CorpIntro', PageName.corp);
  };
  return (
    <BackgroundImage image="/Images/em_corp1p_bg.jpeg">
      <Wrapper>
        <IntroHeaderTextContainer>
          <Header>{localizedText.title}</Header>
          <CorpButton
            href={`/${i18next.language}/business_support?type=emCorporate`}
            onClick={handleEmailClick}>
            {localizedText.button}
          </CorpButton>
        </IntroHeaderTextContainer>
      </Wrapper>
    </BackgroundImage>
  );
}
