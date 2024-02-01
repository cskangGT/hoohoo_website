import React from 'react'
import styled from 'styled-components';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { HomeTransitionButton } from './HomeIntroPage';
import {  HeaderText } from './HomePlatform';
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
  margin-top: 100px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: row;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 800px){
    height: auto;
  }
  `;
  const InnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin-top: 150px;
  @media screen and (max-width: 800px){
    height: auto;
    margin-top: 0px;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
    padding: 15px 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    @media screen and (max-width: 800px){
        width: 90%;
        padding : 30px 0px;
        height: auto;
        align-items: center;
    }
`;
const RightBox = styled.div`
    width: 60%;
    height: 400px;
    position: relative;
    display: flex;
    @media screen and (max-width: 800px){
        height: 180px;
        width: 90%;
    }
`;
const ScreenImage = styled.img`
    position: absolute;
    bottom: -140px;
    height: 550px;
    left: 50%;
  transform: translate(-50%, 0);
    @media screen and (max-width: 800px){
        bottom: -80px;
        height: 300px;
    }
`;
const ButtonBox = styled.div`
  width: 100%;
  padding-top: 30px;
  
  @media screen and (max-width: 800px){
    display: flex;
      width: 100%;
      padding: 20px 0;
      align-items: center;
      justify-content: center;
    }
`;
const UpperTitle = styled.p`
    font-size: 1.5rem;
    color: #2A895F;
    @media screen and (max-width: 800px){
        font-size: 1.2rem;
        text-align: center;
    }
`;
export default function HomePartnership() {
    const navigate = useNavigate();
  const data = {
    "image" : "Images/home3Image.png",
    "title": "Earthmera makes it easy to connect with eco-conscious individuals.",
    "uptitle" : "For EarthMera Partners",
    "buttonText": "Check our partnership",
    "bgImage" : "Images/home3bg.jpeg",
  }
  function goPartnership() {
    navigate('/partnership')
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
                        <HomeTransitionButton onClick={goPartnership}>{data.buttonText}</HomeTransitionButton>
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
