import React from 'react';
import styled from 'styled-components';
import {HomeTransitionButton} from '../../Home/HomeIntroPage';
import {ButtonBox} from '../B2B/PhotoVideoes';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;

  @media screen and (max-width: 800px) {
    padding-left: 5px;
    width: 96%;
  }
`;
const LeftBox = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  @media screen and (max-width: 800px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;
const TextBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const HeaderText = styled.h2`
  font-size: 2.5rem;
  width: 100%;
  font-family: 'Fredoka';
  color: black;
  padding-bottom: 30px;
`;
const ContentText = styled.span`
  font-size: 1.3rem;
  width: 100%;
  color: black;
`;
const LeftTop = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  left: -30px;
  top: -30px;
`;
const RightBot = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  right: -10px;
  bottom: -10px;
`;
const Button = styled(HomeTransitionButton)`
  background-color: #008cff;
`;
const RightBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 90%;
    padding-bottom: 30px;
  }
`;
export default function AskTicketeer() {
  const data = {
    header: 'Make your ticketed events greener with EarthMera Tickteer.',
    content:
      "Partner with EarthMera for your ticketed events. We'll transform your business into a greener model, enlighten your attendees about environmental responsibility, and significantly reduce your cleaning expenses.",
    image: 'Images/ticketeer8Image.png',
    leftTop: 'Images/ticketeerLeftTop.png',
    rightBot: 'Images/ticketeerRightBot.png',
    buttonText: 'Ask about Ticketeer',
  };
  return (
    <Container>
      <LeftBox>
        <TextBox>
          <LeftTop src={data.leftTop} />
          <HeaderText>{data.header}</HeaderText>
          <ContentText>{data.content}</ContentText>
          <RightBot src={data.rightBot} />
        </TextBox>
        <ButtonBox>
          <Button href="mailto:devceohoony@gmail.com">{data.buttonText}</Button>
        </ButtonBox>
      </LeftBox>
      <RightBox>
        <Image src={data.image}></Image>
      </RightBox>
    </Container>
  );
}
