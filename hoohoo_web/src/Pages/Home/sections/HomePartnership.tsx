import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../style';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { UpperTitle } from '../HomePlatform';
import Marquee from "react-fast-marquee";
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
`;
const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// 카드 리스트를 감싸는 컨테이너
const CardBox = styled.div`
  width: 100%;
  overflow: hidden; /* 넘치는 카드 숨기기 */
  position: relative;
`;

const SlideWrapper = styled.div`
  overflow: hidden; /* 넘치는 슬라이드를 숨김 */
  width: 100%;
  position: relative;
`;

const CardList = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 5s linear; /* 이동 애니메이션 */
  column-gap: 16px;
  transform: translate3d(${({ translateX }) => translateX}px, 0, 0); /* X축으로 이동 */
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
                <UpperTitle>
                    {data.uptitle}
                </UpperTitle>
                <HeaderText>
                    {data.title}
                </HeaderText>
            </HeaderBox>
            </Wrapper>
            <CardBox>

      <Marquee >
        {data.cards.map((_card : any, index: number) => (
          <PartnersCard key={index} data={_card} />
        ))}
        
      </Marquee>
    </CardBox>
        </Background>
    </Container>
  )
}

type CardProps = {
    data: {
        title: string;
        description: string;
        icon: string;
    }
}
const CardContainer = styled.div<{backgroundImage: string}>`
    width: 500px;
    height: 250px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border: 3px solid #ffffffa5;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-right: 24px;
  @media screen and (max-width: 850px) {
    height: 230px;
    width: 460px;
    margin-right: 20px;
  }
  @media screen and (max-width: 500px) {
    height: 200px;
    width: 400px;
    margin-right: 16px;
  }
`;
const CardHeader = styled.h2`
  font-size: 2.5rem;
  line-height: 1.1;
  color: ${theme.white};
  margin: 10px 0px;
  text-align: left;
  @media screen and (max-width: 850px) {
    
    font-size: 2.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;
const CardDesc = styled.h4`
  font-size: 2rem;
  line-height: 1.1;
  color: ${theme.white};
  text-align: left;
  width: 90%;
  @media screen and (max-width: 850px) {

    font-size: 1.8rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;
const IconImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 70px;
object-fit: contain;
`;
function PartnersCard ({data} :CardProps) {
    return (
        <CardContainer backgroundImage={'Images/card_background.png'}>
            <CardHeader dangerouslySetInnerHTML={{__html : data.title}}>
            </CardHeader>
            <CardDesc dangerouslySetInnerHTML={{__html : data.description}}>
            </CardDesc>
            <IconImage src={data.icon} />
        </CardContainer>
    )
}
export default HomePartnership