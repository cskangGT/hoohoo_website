import i18next from 'i18next';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../../../Component/Wrapper/Wrapper';
import { HomeTransitionButton } from '../../../Home/HomeIntroPage';
import { ButtonBox } from '../PhotoVideoes';
import { PartnershipContainer, PartnershipInnerContainer, PartnershipLeftBox, PartnershipTitleText, PartnershipDescText, PartnershipRightBox, PartnershipScreenImage } from './PartnershipCarbonTracking';

function PartnershipShop() {
    const navigate = useNavigate();
    const data: any = i18next.t('PartnershipShop', {returnObjects: true});
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
      </PartnershipContainer>
    );
}

export default PartnershipShop