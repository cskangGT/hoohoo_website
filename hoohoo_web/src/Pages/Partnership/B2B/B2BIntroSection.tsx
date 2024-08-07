import React from 'react'
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { slideInFromTop } from '../../../style';

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
  width: 2500px;
  height: 500px;
  @media (max-width: 1200px) {
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 1000px;
    padding-top: 100px;
  }
  @media (max-width: 800px) {
    height: 700px;
  }

`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 1200px) {
   
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
    
    padding-top: 100px;
    flex-direction: column;
    justify-content: flex-start;
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
      right:auto;
      top: 300px;
      z-index: 3;
    }
  }
  @media (max-width: 800px) {
    width: 300px;
    height: 300px;
    
    &:nth-child(2) {
      left: auto;
      right:auto;
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
  background-color: ${colors.green};
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
  color: white;
  position: absolute;
  font-family: 'Fredoka';
  z-index: 3;
  top: calc(50%);
  left: 15%;
  transform: translate(-50%, -50%);
  line-height: 1.2;
  @media (max-width: 1200px) {
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    height: 100%;
    width: 200px;
    padding: 20px 0; 
  }
`;

export default function B2BIntroSection() {
  const isMobile = window.innerWidth < 1200;
  return (
    <Container>
      <GreenLine />
      <Wrapper>
        <InnerContainer>
        <CircleBox>
      <Circle color={colors.yellow}>
      <SecondCircle color={colors.yellow}>
        
          <BoxInSecondCircle>
          <TextInFirstCircle  dangerouslySetInnerHTML={{__html: "green<br />business"}} />
          </BoxInSecondCircle>
        
        </SecondCircle>
      </Circle>
      <Circle color={colors.pink} >
      <SecondCircle color={colors.pink}>
        <BoxInCircle>
        
        <SecondTextInFirstCircle  dangerouslySetInnerHTML={{__html: "where"}} />
          <TextInSecondCircle dangerouslySetInnerHTML={{__html: "green users<br />gather."}} />
        
        </BoxInCircle>
        </SecondCircle>
      </Circle>
      </CircleBox>
      <TextInLine>Present your</TextInLine>
      </InnerContainer>
      </Wrapper>
    </Container>
  )
}
