import Lottie from 'lottie-react';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import firstIcon from './firstIcon.json';

const IconContentBox = styled.div`
  height: 210px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 850px) {
    height: 700px;
    width: 40%;
  }
  @media screen and (max-width: 600px) {
    height: 650px;
    width: 70%;
  }
`;
const Container = styled.div`
  width: 90%;
  padding: 5% 0;
  position: relative;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  align-items: center;
  justify-items: center;
  display: grid;
  background-image: linear-gradient(#343557, #1c2038);
  border-radius: 16px;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    height: 90%;
    width: 100%;
    grid-row-gap: 2rem;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-template-rows: auto;
  }
`;

const ItemBox = styled.div`
  color: ${theme.white};
  background-color: transparent;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  @media screen and (max-width: 850px) {
    justify-content: center;
  }
`;

const FirstText = styled.div`
  font-size: 34px;
  font-weight: 600;
`;
const SecondText = styled.div`
  font-size: 25px;
  font-weight: 500;
`;
const DividerRight = styled.div`
  width: 1px;
  height: 60%;
  background-color: #5a5c81;
  position: absolute;
  top: 20%;
  right: 33%;
  @media screen and (max-width: 850px) {
    left: 20%;
    top: 33%;
    right: 0%;
    width: 60%;
    height: 1px;
  }
`;
const DividerLeft = styled.div`
  width: 1px;
  height: 60%;
  background-color: #5a5c81;
  position: absolute;
  top: 20%;
  left: 33%;
  @media screen and (max-width: 850px) {
    width: 60%;
    left: 20%;
    top: 66%;
    height: 1px;
  }
`;
type Props = {
  i: number;
};
const LottieBox = styled.div<Props>`
  width: 90px;
  position: absolute;
  top: -2rem;
  @media screen and (max-width: 850px) {
    top: ${props => props.i * 12.7 - 2}rem;
  }
`;
const TextBox = styled.div`
  color: ${theme.white};
  background-color: transparent;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  @media screen and (max-width: 1100px) {
    margin-top: 20px;
  }
`;
type DataItem = {
  [key: number]: {
    firstText: string;
    secondText: string;
  };
};
const data: DataItem[] = [
  {
    0: {
      firstText: '30M+',
      secondText: 'lifetime Installs',
    },
  },
  {
    1: {
      firstText: '$60M+',
      secondText: 'given away to date',
    },
  },
  {
    2: {
      firstText: '400+',
      secondText: 'available games',
    },
  },
];
function NumberIconContent() {
  return (
    <IconContentBox>
      <Container>
        <DividerLeft />
        <DividerRight />
        {data.map((item, index) => (
          <ItemBox key={index + 'itembox'}>
            <LottieBox i={index} key={index + 'Lottiebox'}>
              <Lottie
                animationData={firstIcon}
                loop={true}
                key={index + 'Lottie'}
              />
            </LottieBox>
            <TextBox key={index + 'Textbox'}>
              <FirstText key={index + 'text'}>
                {item[index].firstText}
              </FirstText>
              <SecondText key={index + 'secondtext'}>
                {item[index].secondText}
              </SecondText>
            </TextBox>
          </ItemBox>
        ))}
      </Container>
    </IconContentBox>
  );
}
export default NumberIconContent;
