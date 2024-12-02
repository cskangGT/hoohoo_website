import i18next from 'i18next';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../../../Component/Wrapper/Wrapper';
import { HomeTransitionButton } from '../../../Home/HomeIntroPage';
import { UpperTitle, HeaderText } from '../../../Home/HomePlatform';
import { ButtonBox } from '../PhotoVideoes';
import { theme } from '../../../../style';
export const PartnershipContainer = styled.section`
  width: 100%;
  background-color: transparent;
  position: relative;
  align-items: center;
  justify-content: center;
  
  @media screen and (max-width: 850px) {
    height: auto;
    
  }
`;
const Background = styled.div`
  width: 100%;
  position: relative;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 850px) {
    height: auto;
    
  }
`;
export const PartnershipInnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 120px 0px;
  z-index: 10;
  @media screen and (max-width: 850px) {
    height: auto;
    margin: 10px 0px;
    margin-top: 80px;
    
    flex-direction: column-reverse;
  }
`;
export const PartnershipLeftBox = styled.div`
  padding: 30px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  @media screen and (max-width: 850px) {
    width: 90%;
    padding: 30px 0px;
    height: auto;
    align-items: center;
  }
`;
export const PartnershipRightBox = styled.div`
  width: 50%;

  position: relative;
  display: flex;
  @media screen and (max-width: 1200px) {

  }
  @media screen and (max-width: 850px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
const CarbonImage = styled.img`
  position: absolute;
  height: 300px;
  top: 0px;
  right: 0px;
  @media screen and (max-width: 850px) {
    top: -30px;
  }
  @media screen and (max-width: 500px) {
    top: -50px;
  }
`;
export const PartnershipDescText = styled.p`
  color: ${theme.black};
  font-size: 1.2rem;
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 1rem;
  }
`;
export const PartnershipTitleText = styled.h2`
  color: ${theme.black};
  font-size: 2rem;
  line-height: 1.1;
  @media screen and (max-width: 850px) {
    text-align: center;
    font-size: 1.6rem;
  }
`;
export const PartnershipScreenImage = styled.img`

    width: 100%;
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 850px) {
    width: 80%;
  }
`;
function PartnershipCarbonTracking() {
    const navigate = useNavigate();
    const data: any = i18next.t('PartnershipCarbonTracking', {returnObjects: true});
    function goPlatform() {
      navigate('/platform');
    }
    return (
      <PartnershipContainer>
          <Wrapper>
            <PartnershipInnerContainer>
              <PartnershipLeftBox>
                <PartnershipTitleText dangerouslySetInnerHTML={{__html: data.title}} />
                <PartnershipDescText>{data.description}</PartnershipDescText>
                <ButtonBox>
                  <HomeTransitionButton onClick={goPlatform} dangerouslySetInnerHTML={{__html: data.buttonText}}>
                  </HomeTransitionButton>
                </ButtonBox>
              </PartnershipLeftBox>
              <PartnershipRightBox>
                <PartnershipScreenImage src={data.image} />
              </PartnershipRightBox>
            </PartnershipInnerContainer>
          </Wrapper>
            <CarbonImage src={data.carbonImage} />
      </PartnershipContainer>
    );
}

export default PartnershipCarbonTracking