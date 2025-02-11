import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Desc } from '../../../../Component/ContentBox/TwoColBoxesSection';
import { useLanguage } from '../../../../Component/hooks/LanguageContext';
import { slideInFromTop, theme } from '../../../../style';
export const Bg = styled.div<{image: string}>`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  width: calc(100%);
  height: 600px;
  display: flex;
  background-image: url(${props => props.image});
  background-size: cover; // 배경 이미지가 컨테이너를 가능한 많이 채우도록 설정
  background-position: 60%;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  @media screen and (max-width: 1000px) {
    align-items: flex-end;
    margin-top: 70px;
    height: 700px;
  }
`;
const Header = styled.h1<{language: string}>`
  width: calc(100% - 60px);
  font-size: 3rem;
  color: ${theme.darkGray};
  font-family: ${props => (props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka')};
  font-weight: 600;

  @media screen and (max-width: 1200px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.1rem;
    padding: 0px 30px;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
    padding: 0px 30px;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.8rem;
  }
`;
const ContentText = styled.p`
  color: ${theme.darkGray};
  font-size: 1.8rem;

  line-height: 1.5;
  max-width: 630px;
  word-break: keep-all;
  @media screen and (max-width: 1200px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
    padding: 0px 30px;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    padding: 0px 30px;
    width: calc(100% - 60px);
  }
  @media screen and (max-width: 400px) {
    font-size: 1.4rem;
    width: calc(100% - 60px);
  }
`;
const ImageBox = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    border-radius: 0px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const SubHeader = styled(Desc)`
  width: auto;
  text-align: right;
  color: ${theme.mainNeon};
  font-size: 2.5rem;
  padding-bottom: 25px;
  @media screen and (max-width: 1000px) {
    padding-bottom: 0px;
  }
`;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: right;
  row-gap: 20px;
  width: calc(100% - 0px);
  margin-top: 100px;
  color: ${theme.white};
  padding-bottom: 30px;
  @media screen and (max-width: 1000px) {
    /* padding-right: 15px; */
  }
`;
export default function VisionIntro() {
  const data: any = i18next.t('VisionIntro', {returnObjects: true});
  const {language} = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Container>
      <Header
        dangerouslySetInnerHTML={{__html: data.header}}
        language={language}
      />
      <ImageBox>
        <Image src={isMobile ? data.smallImage : data.image} />
      </ImageBox>
      <ContentText dangerouslySetInnerHTML={{__html: data.content}} />
    </Container>
  );
}
