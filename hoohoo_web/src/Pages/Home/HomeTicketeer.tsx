import React from 'react'
import styled from 'styled-components';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { HomeTransitionButton } from './HomeIntroPage';
import { UpperTitle, HeaderText, ButtonBox } from './HomePlatform';
import { useNavigate } from 'react-router-dom';
const Container = styled.section`
width: 100%;
  background-color: transparent;
  height: 800px;
  @media screen and (max-width: 800px){
    height: auto;
  }
`;
const Background = styled.div<{ backgroundImage: string }>`
  width: 100%;
  margin-top: 50px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: row;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 800px){
    height: auto;
    margin-top: 50px;
    
  }
  `;
const ScreenImage = styled.img`
  height: 600px;
  object-fit: contain;
  @media screen and (max-width: 800px){
    height: 400px;
    margin-top: 20px;
    
  }
`;
const InnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 800px){
    height: auto;
    margin-top: 0px;
    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
    padding: 30px 60px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    @media screen and (max-width: 800px){
        width: 90%;
        padding :30px 0px;
        height: auto;
        align-items: center;
    }
`;
const RightBox = styled.div`
    width: 50%;
    height: 600px;
    position: relative;
    display: flex;
    @media screen and (max-width: 800px){
        height: auto;
        width: 90%;
        height: 400px;
    }
`;
export default function HomeTicketeer() {
    const navigate = useNavigate();
    const data = {
        "bgImage": "Images/home4bg.jpeg",
        "image" : "Images/home4Image.png",
        "uptitle" : "For festival organizer",
        "title" : "Imagine the environmental and cost benefits with Earthmera if festival attendees helped clean up!",
        "buttonText" : "Check EM Ticketeer"

    }
    function goTicketeer () {
        navigate('/partnership#ticketeer')
    }
  return (
        <Background backgroundImage={data.bgImage}>
            <Wrapper>
                <InnerContainer>
            <LeftBox>
                <UpperTitle>{data.uptitle}</UpperTitle>
                <HeaderText dangerouslySetInnerHTML={{__html: data.title}} />
                <ButtonBox>
                    <HomeTransitionButton onClick={goTicketeer}>{data.buttonText}</HomeTransitionButton>
                </ButtonBox>
            </LeftBox>
            <RightBox>
                <ScreenImage src={data.image}></ScreenImage>
            </RightBox>
            </InnerContainer>
            </Wrapper>
        </Background>
  )
}
