import i18next from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { logButtonEvent, PageName } from '../../../util/firebase_custom_event';
import { HomeTransitionButton } from '../styles';
import { ButtonBox, HeaderText, UpperTitle } from './HomeEnvImpact';
import { useLanguage } from '../../../components/hooks/LanguageContext';
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
const HomeEcoProducts = () => {
  const navigate = useNavigate();
  const {language} = useLanguage();
  const data: any = i18next.t('HomeEcoProducts', {returnObjects: true});
  function goPlatform() {
    logButtonEvent('go_platform in HomeEcoProducts', PageName.home);
    navigate(`/${language}/platform`);
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
};

export default HomeEcoProducts;
