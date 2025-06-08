import i18next from 'i18next';
import React from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import {useLanguage} from '../../../../components/hooks/LanguageContext';
import Wrapper from '../../../../components/Wrapper/Wrapper';
import {theme} from '../../../../style';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: auto;

  @media screen and (max-width: 850px) {
    height: auto;
  }
`;
const Background = styled.div<{backgroundImage: string}>`
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: column;
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  overflow: visible;
  z-index: 1;
  padding-top: 75px;
  padding-bottom: 100px;
  @media screen and (max-width: 850px) {
    margin-top: 90px;
  }
`;

const HeaderText = styled.h2`
  font-size: 3rem;
  line-height: 1.1;
  color: ${theme.white};
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 2.5rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;
const HeaderBox = styled.div`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 70px;
`;

const Header = styled.h1<{language: string}>`
  width: calc(100% - 20px);
  font-size: 3rem;
  color: ${theme.darkGray};
  text-align: left;

  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 600;
  padding: 0px;
  @media screen and (max-width: 1200px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.1rem;
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.5rem;
  }
`;
const CardBox = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
`;
function ValueMarquee() {
  const data: any = i18next.t('ValueMarquee', {returnObjects: true});
  const {language} = useLanguage();
  return (
    <Container>
      <Background backgroundImage={data.bgImage}>
        <Wrapper>
          <HeaderBox>
            <Header language={language}>{data.title}</Header>
          </HeaderBox>
        </Wrapper>
        <CardBox>
          <Marquee speed={80} style={{overflow: 'visible'}}>
            {data.cards.map((_card: any, index: number) => (
              <ValueCard key={index} data={_card} />
            ))}
          </Marquee>
        </CardBox>
      </Background>
    </Container>
  );
}

type CardProps = {
  data: {
    title: string;
    description: string;
    icon: string;
  };
};
const CardContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #ebebeb;
  position: relative;
  border-radius: 40px;
  display: flex;
  flex-direction: column;

  padding: 50px 40px 30px 40px;
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.1),
    0px 6px 6px rgba(0, 0, 0, 0.05),
    inset 0px 1px 1px rgba(255, 255, 255, 0.8);
  margin-right: 24px;
  position: relative;
  transition: all 0.3s ease;

  @media screen and (max-width: 850px) {
    height: 230px;
    width: 460px;
    padding: 40px 30px 25px 30px;
    margin-right: 20px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
    width: 300px;
    padding: 30px 25px 20px 25px;
    margin-right: 16px;
  }

  @media screen and (max-width: 400px) {
    width: 260px;
    height: 230px;
  }
`;
const CardHeader = styled.h2`
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 500;
  color: ${theme.darkGray};
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: left;
  @media screen and (max-width: 850px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;
const CardDesc = styled.h4<{language: string}>`
  font-size: ${props => (props.language === 'ko' ? '1.25rem' : '1.25rem')};
  line-height: 1.7;
  font-weight: 400;
  color: #525252;
  text-align: left;
  width: 100%;
  margin: 10px 0px;
  @media screen and (max-width: 850px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;
const IconBox = styled.div`
  width: 110px;
  height: 110px;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 
    /* 외부 그림자 */
    0px 4px 8px 0px rgba(0, 0, 0, 0.15),
    /* 내부 그림자 - 위쪽과 왼쪽은 밝게 */ inset 2px 2px 5px 0px
      rgba(255, 255, 255, 0.5),
    /* 내부 그림자 - 아래쪽과 오른쪽은 어둡게 */ inset -2px -2px 5px 0px
      rgba(0, 0, 0, 0.1);
`;
const IconImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;
function ValueCard({data}: CardProps) {
  const {language} = useLanguage();
  return (
    <CardContainer>
      <IconBox>
        <IconImage src={data.icon} />
      </IconBox>
      <CardHeader>{data.title}</CardHeader>
      <CardDesc language={language}>{data.description}</CardDesc>
    </CardContainer>
  );
}

export default ValueMarquee;
