import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper/Wrapper';
import { HomeTransitionButton } from './styles';
import { ButtonBox, HeaderText, UpperTitle } from './sections/HomeEnvImpact';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: 800px;
  @media screen and (max-width: 850px) {
    height: auto;
  }
`;
const Background = styled.div<{backgroundImage: string}>`
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
  @media screen and (max-width: 850px) {
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
  @media screen and (max-width: 850px) {
    height: auto;

    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
  padding: 30px 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  @media screen and (max-width: 1100px) {
    padding: 30px 20px;
    padding-left: 40px;
  }
  @media screen and (max-width: 850px) {
    width: 100%;
    padding: 30px 0px;
    height: auto;
    align-items: center;
  }
`;
const RightBox = styled.div`
  width: 50%;
  height: 400px;
  position: relative;
  display: flex;
  @media screen and (max-width: 1200px) {
    height: 200px;
  }
  @media screen and (max-width: 850px) {
    height: 240px;
  }
`;
const ScreenImage = styled.img`
  position: absolute;

  height: 530px;
  top: 50%;
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%);
  @media screen and (max-width: 1200px) {
    height: 400px;
  }
  @media screen and (max-width: 850px) {
    height: 260px;
  }
`;
function HomePartnershipEcoBoard() {
  const navigate = useNavigate();
  const data = {
    title:
      'Connect effortlessly with<br />a community of eco-conscious<br />individuals on EarthMera',
    uptitle: 'For EarthMera Partners',
    buttonText: 'Check our partnership',
    bgImage: 'Images/home2bg.jpeg',
    image: 'Images/home2EcoBoard.png',
  };
  function goPartnership() {
    navigate('/partnership');
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
                <HomeTransitionButton onClick={goPartnership}>
                  {data.buttonText}
                </HomeTransitionButton>
              </ButtonBox>
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

export default HomePartnershipEcoBoard;
