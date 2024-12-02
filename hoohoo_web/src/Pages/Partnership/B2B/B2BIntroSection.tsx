import React from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {slideInFromTop} from '../../../style';
import i18next from 'i18next';

// 공통적으로 사용될 스타일 변수들을 정의합니다.
const colors = {
  green: '#2A895F',
  yellow: '#ffc64ac1',
  pink: '#f7a8c8c2',
};

const Container = styled.div`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  
  height: 500px;
  @media (max-width: 1200px) {
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 800px;
    padding-top: 100px;
  }
  @media (max-width: 800px) {
    height: 700px;
    justify-content: center;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
column-gap: 20px;
  @media (max-width: 1200px) {
    row-gap: 20px;
    flex-direction: column;
    justify-content: center;
  }
`;
const CircleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  @media (max-width: 600px) {
    padding: 10px;
  }
`;
const CircleImage = styled.img`
  width: 800px;
  height: 500px;
  @media (max-width: 1200px) {
    width: 600px;
    height: 400px;
  }
  @media (max-width: 900px) {
    width: 500px;
    height: 300px;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    padding: 15px;
  }
`;
const Circle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  position: absolute;
  &:first-child {
    z-index: 2;
  }
  &:nth-child(2) {
    z-index: 3;
    left: -50%;
  }
  @media (max-width: 1200px) {
    width: 400px;
    height: 400px;
    &:nth-child(2) {
      left: auto;
      right: auto;
      top: 300px;
      z-index: 3;
    }
  }
  @media (max-width: 800px) {
    width: 300px;
    height: 300px;

    &:nth-child(2) {
      left: auto;
      right: auto;
      top: 250px;
      z-index: 3;
    }
  }
`;
const SecondCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  position: absolute;
  &:first-child {
    z-index: 1;
  }

  @media (max-width: 1200px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 800px) {
    width: 300px;
    height: 300px;
  }
`;
const BoxInCircle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  @media (max-width: 1200px) {
    flex-direction: column;
    height: 100%;
  }
`;
const TextInFirstCircle = styled.p`
  font-size: 2.5rem;
  color: white;
  /* padding-left: 50px; */
  width: 50%;
  font-family: 'Fredoka';
  text-align: center;
  z-index: 3;
  margin: 0;
  line-height: 1.1;
  @media (max-width: 1200px) {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SecondTextInFirstCircle = styled.p`
  font-size: 2.5rem;
  color: white;
  width: 50%;
  text-align: center;
  font-family: 'Fredoka';
  z-index: 10;
  margin: 0;
  line-height: 1.1;
  @media (max-width: 1200px) {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const BoxInSecondCircle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1200px) {
    justify-content: center;
    align-self: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 50%;
  }
`;
const TextInSecondCircle = styled.p`
  font-size: 2.5rem;
  line-height: 1.1;
  color: white;
  margin: 0;
  width: 50%;
  text-align: center;
  font-family: 'Fredoka';
  z-index: 3;
  @media (max-width: 1200px) {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const GreenLine = styled.div`
  height: 150px;
  background-color: transparent;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  @media (max-width: 1200px) {
    height: 100%;
    width: 200px;
    padding: 20px 0;
  }
`;

const TextInLine = styled.span`
  font-size: 2.5rem;
  color: #028d47;
  font-family: 'Fredoka';
  z-index: 3;
  line-height: 1.2;
  @media (max-width: 1200px) {
    text-align: center;
    font-size: 2rem;
    padding: 20px 0;
  }
  @media (max-width: 900px) {
    text-align: center;
    font-size: 1.8rem;
    padding: 20px 0;
  }
  @media (max-width: 600px) {
    text-align: center;
    font-size: 1.5rem;
    padding: 20px 0;
  }

`;

export default function B2BIntroSection() {
  const isMobile = window.innerWidth < 1200;
  const data: any = i18next.t('PartnershipIntro', {returnObjects: true});
  return (
    <Container>
      <Wrapper>
        <InnerContainer>
        <TextInLine>{data.showcase}</TextInLine>
          <CircleBox>
            <CircleImage
              src={data.image}
            />
            {/* <Circle color={colors.yellow}>
              <SecondCircle color={colors.yellow}>
                <BoxInSecondCircle>
                  <TextInFirstCircle
                    dangerouslySetInnerHTML={{__html: 'green<br />business'}}
                  />
                </BoxInSecondCircle>
              </SecondCircle>
            </Circle>
            <Circle color={colors.pink}>
              <SecondCircle color={colors.pink}>
                <BoxInCircle>
                  <SecondTextInFirstCircle
                    dangerouslySetInnerHTML={{__html: 'where'}}
                  />
                  <TextInSecondCircle
                    dangerouslySetInnerHTML={{
                      __html: 'green users<br />gather.',
                    }}
                  />
                </BoxInCircle>
              </SecondCircle>
            </Circle> */}
          </CircleBox>
          
        </InnerContainer>
      </Wrapper>
    </Container>
  );
}
