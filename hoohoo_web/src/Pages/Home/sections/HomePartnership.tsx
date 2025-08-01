import i18next from 'i18next';
import React from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {theme} from '../../../style';
import {UpperTitle} from './HomeEnvImpact';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: auto;
  margin: 50px 0px;
  @media screen and (max-width: 850px) {
    height: auto;
    margin: 0px 0px;
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
  z-index: 1;
  padding-top: 100px;
  padding-bottom: 150px;
  @media screen and (max-width: 850px) {
    margin-top: 90px;
    padding-bottom: 120px;
  }
`;

const HeaderText = styled.h2`
  font-size: 2rem;
  line-height: 1.3;
  color: ${theme.white};
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 70px;
  padding: 0px 0px;
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
    padding: 0px 20px;
  }
`;
const HeaderBox = styled.div`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 0px;

  @media screen and (max-width: 1200px) {
    padding-left: 20px;
  }
  @media screen and (max-width: 850px) {
    padding-left: 0px;
  }
`;

const CardBox = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

// 애니메이션 효과를 적용한 카드 리스트
// const CardList = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 20px;
//   animation: ${marquee} 20s linear infinite;
//   transition-duration: 5000ms;
//   @media screen and (max-width: 850px) {
//     animation: ${marquee} 15s linear infinite;
//   }
//   @media screen and (max-width: 500px) {
//     animation: ${marquee} 10s linear infinite;
//   }
// `;

function HomePartnership() {
  const data: any = i18next.t('HomePartnership', {returnObjects: true});

  return (
    <Container>
      <Background backgroundImage={data.bgImage}>
        <Wrapper>
          <HeaderBox>
            <UpperTitle>{data.uptitle}</UpperTitle>
            <HeaderText>{data.title}</HeaderText>
          </HeaderBox>
        </Wrapper>
        <CardBox>
          <Marquee speed={80}>
            {data.cards.map((_card: any, index: number) => (
              <PartnersCard key={index} data={_card} />
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
const CardContainer = styled.div<{backgroundImage: string}>`
  width: 400px;
  height: 220px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border: 3px solid #ffffffa5;
  border-radius: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  margin-right: 24px;
  @media screen and (max-width: 850px) {
    height: 200px;
    width: 300px;
    margin-right: 20px;
  }
  @media screen and (max-width: 500px) {
    height: 200px;
    width: 300px;
    margin-right: 16px;
  }
`;
const CardHeader = styled.h2`
  font-size: 1.5rem;
  line-height: 1.1;
  font-weight: 500;
  color: ${theme.white};
  margin: 10px 0px;
  text-align: left;
  @media screen and (max-width: 850px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.25rem;
  }
`;
const CardDesc = styled.h4`
  font-size: 1.25rem;
  margin: 0px;
  line-height: 1.5;
  color: #d1d1d1bc;
  text-align: left;
  font-weight: 400;
  width: 90%;
  @media screen and (max-width: 850px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const IconImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 90px;
  object-fit: contain;
`;
function PartnersCard({data}: CardProps) {
  return (
    <CardContainer backgroundImage={'/Images/card_background.png'}>
      <CardHeader>{data.title}</CardHeader>
      <CardDesc>{data.description}</CardDesc>
      <IconImage src={data.icon} />
    </CardContainer>
  );
}
export default HomePartnership;
