import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {slideInFromTop} from '../../../style';
import i18next from 'i18next';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  @media screen and (max-width: 1000px) {
  }
`;
const Background = styled.div`
  width: 100%;

  /* background-size: cover;
  background-position: center; */
  position: relative;
  flex-direction: row;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 1000px) {
    height: auto;
    margin-top: 0px;
    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  @media screen and (max-width: 1000px) {
    width: 80%;
    row-gap: 10px;
    padding: 30px 0px;
    height: auto;
    align-items: center;
  }
`;
const RightBox = styled.div`
  width: 60%;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  @media screen and (max-width: 1000px) {
    /* height: 140px; */
    width: 100%;
  }
`;
const ContentText = styled.p`
  font-size: 1.5rem;
  color: black;
  padding-top: 5px;
  @media screen and (max-width: 1200px) {
    font-size: 1.3rem;
    text-align: center;
  }
`;
const Header = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1.1;
  text-align: left;
  font-family: 'Fredoka';
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    text-align: center;
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: 2.3rem;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
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
      <Background>
        <Wrapper>
          <InnerContainer>
            <LeftBox>
              <Header dangerouslySetInnerHTML={{__html: data.title}} />
              <ContentText dangerouslySetInnerHTML={{__html: data.content}} />
            </LeftBox>
            <RightBox>
              <ScreenImage src={data.image}></ScreenImage>
            </RightBox>
          </InnerContainer>
        </Wrapper>
      </Background>
    </Container>
  );
}
