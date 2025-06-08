import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {useLanguage} from '../../../../components/hooks/LanguageContext';
import {slideInFromTop, theme} from '../../../../style';
import {logButtonEvent, PageName} from '../../../../util/firebase_custom_event';
import {HomeTransitionButton} from '../../../Home/styles';
const Container = styled.div`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  /* height: 550px; */
  padding-top: 82px;
  padding-bottom: 100px;
  @media (max-width: 1000px) {
    height: auto;
    flex-direction: column-reverse;
    justify-content: center;
  }
  @media (max-width: 500px) {
    padding-top: 82px;
  }
`;
const Header = styled.h2<{language: string}>`
  font-size: 2.4rem;
  line-height: 1.2;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 600;
  margin-bottom: 15px;
  white-space: pre-line;
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 2.1rem;
  }
`;
const LeftBox = styled.div`
  box-sizing: border-box;
  width: 40%;

  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  /* background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%); */
  border-radius: 20%;
  margin: auto;
  @media screen and (max-width: 1000px) {
    margin-top: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    margin-top: 0px;
  }
`;
const HeaderBox = styled.div`
  padding: 20px 0;

  width: 100%;
  color: ${theme.darkGray};
  text-align: left;
  position: relative;
`;
const StarImage = styled.img`
  right: -30px;
  width: 80px;
  height: 80px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  @media screen and (max-width: 1200px) {
    width: 60px;
    height: 60px;
    top: 20%;
  }
  @media screen and (max-width: 1000px) {
    width: 60px;
    height: 60px;
    top: 20%;
  }
  @media screen and (max-width: 500px) {
    width: 50px;
    height: 50px;
    right: -15px;
    transform: translateY(-50%);
  }
`;
const RightBox = styled.div`
  justify-content: flex-start;
  display: flex;
  position: relative;
  width: 60%;
  height: 500px;
  @media screen and (max-width: 1000px) {
    padding: 0 10px;
    width: 90%;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    padding: 0 10px;
    width: 100%;
    text-align: center;
    height: 350px;
  }
`;
const Image = styled.img`
  height: 500px;
  width: 100%;
  object-fit: contain;
  position: absolute;
  @media screen and (max-width: 500px) {
    height: 400px;
    width: 110%;
    left: -5%;
  }
`;
function TicketeerIntro() {
  const data: any = i18next.t('TicketeerIntro', {returnObjects: true});
  const {language} = useLanguage();
  const handleEmailClick = () => {
    logButtonEvent('ask_partnership in TicketeerIntro', PageName.ticketeer);
  };
  return (
    <Container>
      <LeftBox>
        <HeaderBox>
          <Header language={language}>{data.header}</Header>
          <StarImage src={data.titleStar} />
        </HeaderBox>

        <HomeTransitionButton
          href={`/${language}/business_support?type=ticketeer`}
          onClick={handleEmailClick}>
          {data.buttonText}
        </HomeTransitionButton>
      </LeftBox>
      <RightBox>
        <Image src={data.image} />
      </RightBox>
    </Container>
  );
}

export default TicketeerIntro;
