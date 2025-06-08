import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useLanguage} from '../../../../components/hooks/LanguageContext';
import Wrapper from '../../../../components/Wrapper/Wrapper';
import {slideInFromTop, theme} from '../../../../style';
import {PageName} from '../../../../util/firebase_custom_event';
import DownloadButtons from '../../../Home/DownloadButtons';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  @media screen and (max-width: 1000px) {
  }
`;
const Background = styled.div<{backgroundImage: string}>`
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: row;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 1000px) {
    height: 800px;
  }
`;
const Overlay = styled.div<{overlayImage: string}>`
  background-image: url(${props => props.overlayImage});
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;
const InnerContainer = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 1000px) {
    height: auto;
    margin-top: 0px;
  }
`;

const ContentText = styled.p`
  font-size: 1.5rem;
  color: ${theme.white};
  line-height: 1.3;
  font-family: 'Fredoka';
  font-weight: 300;
  padding-top: 2rem;
  padding-bottom: 4rem;
  margin: 0px;
  @media screen and (max-width: 1200px) {
    font-size: 1.3rem;
    text-align: center;
  }
`;
const Header = styled.h2<{language: string}>`
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1.5;
  text-align: center;
  color: ${theme.white};
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 600;
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 700px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 2.1rem;
  }
`;
const ScreenImage = styled.img`
  height: 400px;
  @media screen and (max-width: 1000px) {
    height: 250px;
  }
`;
export default function B2cIntroSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const {language} = useLanguage();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const data: any = i18next.t('B2cIntroSection', {returnObjects: true});

  return (
    <Container>
      <Background backgroundImage={data.bgImage}>
        <Wrapper>
          <InnerContainer>
            <Header language={language}>{data.title}</Header>
            <ContentText>{data.content}</ContentText>
            <DownloadButtons pageName={PageName.platform} />
          </InnerContainer>
        </Wrapper>
        <Overlay overlayImage={data.overlay} />
      </Background>
    </Container>
  );
}
