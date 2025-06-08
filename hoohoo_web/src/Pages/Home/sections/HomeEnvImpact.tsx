import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useLanguage} from '../../../components/hooks/LanguageContext';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {theme} from '../../../style';
import {logButtonEvent, PageName} from '../../../util/firebase_custom_event';
import {HomeTransitionButton} from '../styles';
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
  @media screen and (max-width: 1200px) {
    height: 350px;
  }
  @media screen and (max-width: 1000px) {
    height: 330px;
  }
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
    margin-top: 0px;
    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
  padding: 30px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  @media screen and (max-width: 850px) {
    width: 90%;
    padding: 30px 0px;
    height: auto;
    align-items: center;
  }
`;
const RightBox = styled.div`
  width: 60%;
  height: 500px;
  position: relative;
  display: flex;
  @media screen and (max-width: 1200px) {
    height: 200px;
  }
  @media screen and (max-width: 850px) {
    height: 240px;
    width: 40%;
  }
`;
const ScreenImage = styled.img`
  position: absolute;
  object-fit: contain;
  height: 500px;
  top: 50%;
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%);
  @media screen and (max-width: 1200px) {
    height: 400px;
  }
  @media screen and (max-width: 1000px) {
    height: 350px;
  }
  @media screen and (max-width: 850px) {
    height: 250px;
  }
`;
export const UpperTitle = styled.p`
  font-size: 1.2rem;
  color: #39b54a;
  @media screen and (max-width: 850px) {
    font-size: 1rem;
    text-align: center;
  }
`;
export const HeaderText = styled.h2`
  font-size: 1.4rem;
  line-height: 1.5;
  color: ${theme.white};
  font-weight: 400;
  white-space: pre-line;
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 1.2rem;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  width: 80%;
  @media screen and (max-width: 850px) {
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
`;

export default function HomeEnvImpact() {
  const navigate = useNavigate();
  const {language} = useLanguage();
  const data: any = i18next.t('HomeEnvImpact', {returnObjects: true});
  function goPlatform() {
    logButtonEvent('go_platform in HomeEnvImpact', PageName.home);
    navigate(`/${language}/platform`);
  }
  return (
    <Container>
      <Background backgroundImage={data.bgImage}>
        <Wrapper>
          <InnerContainer>
            <LeftBox>
              <UpperTitle>{data.uptitle}</UpperTitle>
              <HeaderText>{data.title}</HeaderText>
              <ButtonBox>
                <HomeTransitionButton onClick={goPlatform}>
                  {data.buttonText}
                </HomeTransitionButton>
              </ButtonBox>
            </LeftBox>
            <RightBox>
              <ScreenImage src={data.image} />
            </RightBox>
          </InnerContainer>
        </Wrapper>
      </Background>
    </Container>
  );
}
