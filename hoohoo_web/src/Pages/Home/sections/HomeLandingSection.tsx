import React from 'react'
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style';
import i18next from 'i18next';
import DownloadButtons from '../DownloadButtons';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const Container = styled.div`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: 800px;
  
  @media (max-width: 1200px) {
    height: auto;
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: 40px;
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
    padding-bottom: 10px;
    z-index: 10;
    /* background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%); */
    border-radius: 20%;
    margin: auto;
    @media screen and (max-width: 1200px) {
        margin-top: 10px;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 500px) {
    margin-top: 0px;
    padding-bottom: 50px;

    }
`;
const TitleText = styled.h2`
  padding: 30px 0;
  font-size: 2.5rem;
  line-height: 1.2;
  width: 100%;
  color: ${theme.darkGray};
  text-align: left;
  @media screen and (max-width: 1200px) {
    font-size: 2.3rem;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 2.1rem;
  }
  font-family: Fredoka;
    font-weight: 600;
    margin: 0px;
`;
const HeaderBox = styled.div`
  padding: 20px 0;
  padding-bottom: 50px;
  width: 100%;
  color: ${theme.darkGray};
  text-align: left;
  position: relative;
  @media screen and (max-width: 500px) {
    width: calc(100% - 20px);
    padding: 20px 10px;
  }
`;

const Desc = styled.p`
  font-size: 1.3rem;
  line-height: 1.3;
  width: 100%;
  color: ${theme.darkGray};
  opacity: 0.8;
  margin: 0 5px;
  text-align: left;
  z-index: 10;
  @media screen and (max-width: 1200px) {
    margin: 20px 0;
    width: 100%;
    text-align: center;

  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    font-size: 1.1rem;
  }
`;
const RightBox = styled.div`
  justify-content: flex-start;
  display: flex;
  position: relative;
  width: 60%;
  @media screen and (max-width: 1200px) {
    padding: 0 10px;
    width: 90%;
    height: auto;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    padding: 0 10px;
    text-align: center;
  }
`;
const Image = styled.img`
  right: -30%;
  
  z-index: 9;
  position: absolute;
  height: 650px;
  transform: translateY(-30%);
  @media screen and (max-width: 1200px) {
    position: relative;
        transform: translateY(0%);
        width: 100%;
        right: 0px;
        height: 500px;
    }
  @media screen and (max-width: 1000px) {
        position: relative;
        transform: translateY(0%);
        width: 100%;
        right: 0px;
        height: 500px;
    }
    @media screen and (max-width: 500px) {
        height: 400px;
    }
`;
function HomeLandingSection() {
    const data: any = i18next.t('HomeLandingSection', {returnObjects: true});
  return (
    <Wrapper>
        <Container>
            <LeftBox>
                <HeaderBox>
                    <TitleText dangerouslySetInnerHTML={{__html: data.title}} />
                    <Desc dangerouslySetInnerHTML={{__html: data.content}} />
                </HeaderBox>
                
                <DownloadButtons />
            </LeftBox>
            <RightBox>
                <Image src={data.image} />
            </RightBox>
        </Container>
    </Wrapper>
  )
}

export default HomeLandingSection