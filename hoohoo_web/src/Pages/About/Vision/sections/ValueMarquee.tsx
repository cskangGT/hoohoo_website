import i18next from 'i18next';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../../style';
import Marquee from 'react-fast-marquee';
import Wrapper from '../../../../Component/Wrapper/Wrapper';
import { UpperTitle } from '../../../Home/HomePlatform';
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
  margin-bottom: 70px;
`;
const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Header = styled.h1`
  width: calc(100% - 20px);
  font-size: 3rem;
  color: ${theme.darkGray};
  text-align: left;
  font-family: Fredoka;
  font-weight: 600;
  padding: 0px 10px;
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
  overflow: hidden;
  position: relative;
`;
function ValueMarquee() {
    const data: any = i18next.t('ValueMarquee', {returnObjects: true});
  return (
    <Container>
        <Background backgroundImage={data.bgImage}>
          <Wrapper>
          <HeaderBox>
              <Header>{data.title}</Header>
          </HeaderBox>
          </Wrapper>
          <CardBox>
              <Marquee >
                {data.cards.map((_card : any, index: number) => (
                  <ValueCard key={index} data={_card} />
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
const CardContainer = styled.div`
    width: 500px;
    height: 300px;
  background-color: #ebebeb;
  position: relative;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-right: 24px;
  @media screen and (max-width: 850px) {
    height: 230px;
    width: 460px;
    margin-right: 20px;
  }
  @media screen and (max-width: 500px) {
    height: 250px;
    width: 360px;
    margin-right: 16px;
  }
`;
const CardHeader = styled.h2`
  font-size: 2.2rem;
  line-height: 1.1;
  color: ${theme.darkGray};
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: left;
  @media screen and (max-width: 850px) {
    
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;
const CardDesc = styled.h4`
  font-size: 1.7rem;
  line-height: 1.1;
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
const IconImage = styled.img`
  width: 100px;
  height: 80px;
object-fit: contain;
`;
function ValueCard ({data} : CardProps) {
    return (
        <CardContainer >
            <IconImage src={data.icon} />
            <CardHeader dangerouslySetInnerHTML={{__html : data.title}}>
            </CardHeader>
            <CardDesc dangerouslySetInnerHTML={{__html : data.description}}>
            </CardDesc>
            
        </CardContainer>
    )
}

export default ValueMarquee