import React from 'react'
import styled from 'styled-components';
import { theme } from '../../style';
import { HomeTransitionButton } from './HomeIntroPage';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../Component/Wrapper/Wrapper';
const Container = styled.section`
width: 100%;
  background-color: transparent;
  height: 800px;
  @media screen and (max-width: 850px){
    height: auto;
  }
`;
const Background = styled.div<{ backgroundImage: string }>`
  width: 100%;
  margin-top: 300px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: row;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 850px){
    height: auto;
    margin-top: 90px;
    
  }
  `;

const InnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 850px){
    height: auto;
    margin-top: 0px;
    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
    padding: 30px 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    @media screen and (max-width: 850px){
        width: 80%;
        padding :30px 0px;
        height: auto;
        align-items: center;
    }
`;
const RightBox = styled.div`
    width: 50%;
    height: 400px;
    position: relative;
    display: flex;
    @media screen and (max-width: 850px){
        height: 180px;
        width: 40%;
    }
`;
const ScreenImage = styled.img`
    position: absolute;
    bottom: 0px;
    height: 550px;
    left: 50%; /* Center horizontally */
  transform: translate(-50%, 0);
    @media screen and (max-width: 850px){
        height: 250px;
    }
`;
export const UpperTitle = styled.p`
    font-size: 1.5rem;
    color: #39B54A;
    @media screen and (max-width: 850px){
        font-size: 1.2rem;
        text-align: center;
    }
`;
export const HeaderText = styled.h2`
  font-size: 2.5rem;
    color: ${theme.white};
    @media screen and (max-width: 850px){
        text-align: center;
        font-size: 1.8rem;
    }
`;
export const ButtonBox = styled.div`
  display: flex;
  width: 80%;
  @media screen and (max-width: 850px){
      
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
`;

export default function HomePlatform() {
    const navigate = useNavigate();
    const data ={
        "title": "Snap, Reward and <br /> check your green impact",
        "uptitle" : "For EarthMera Users",
        "buttonText": "Check our platform",
        "bgImage" : "Images/home2bg.jpeg",
        "image" : "Images/home2Screen.png"
    }
    function goPlatform () {
        navigate('/platform')
    }
  return (
    <Container>
        <Background backgroundImage={data.bgImage}>
            <Wrapper>
                <InnerContainer>
            <LeftBox>
                <UpperTitle>{data.uptitle}</UpperTitle>
                <HeaderText dangerouslySetInnerHTML={{__html: data.title}} />
                <ButtonBox>
                    <HomeTransitionButton onClick={goPlatform}>{data.buttonText}</HomeTransitionButton>
                </ButtonBox>
            </LeftBox>
            <RightBox>
                <ScreenImage src={data.image}></ScreenImage>
            </RightBox>
            </InnerContainer>
            </Wrapper>
        </Background>
    </Container>
  )
}
