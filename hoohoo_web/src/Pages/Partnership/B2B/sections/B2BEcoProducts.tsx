import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useLanguage} from '../../../../components/hooks/LanguageContext';
import {logButtonEvent, PageName} from '../../../../util/firebase_custom_event';
import {HomeTransitionButton} from '../../../Home/styles';
import {ButtonBox} from '../PhotoVideoes';
import {
  PartnershipContainer,
  PartnershipDescText,
  PartnershipInnerContainer,
  PartnershipLeftBox,
  PartnershipRightBox,
  PartnershipScreenImage,
  PartnershipTitleText,
} from './PartnershipCarbonTracking';
const B2BPartnershipScreenImage = styled(PartnershipScreenImage)`
  width: 70%;
  align-self: center;
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 850px) {
    width: 80%;
  }
`;
function B2BEcoProducts() {
  const navigate = useNavigate();
  const data: any = i18next.t('B2BEcoProducts', {returnObjects: true});

  const {language} = useLanguage();
  const handleEmailClick = () => {
    logButtonEvent('ask_partnership in B2BEcoProducts', PageName.partnership);
  };
  return (
    <PartnershipContainer>
      <PartnershipInnerContainer>
        <PartnershipLeftBox>
          <PartnershipTitleText language={language}>
            {data.title}
          </PartnershipTitleText>
          <PartnershipDescText language={language}>
            {data.description}
          </PartnershipDescText>
          <ButtonBox>
            <HomeTransitionButton
              href={`/${i18next.language}/business_support?type=ecoProduct`}
              onClick={handleEmailClick}>
              {data.buttonText}
            </HomeTransitionButton>
          </ButtonBox>
        </PartnershipLeftBox>
        <PartnershipRightBox>
          <B2BPartnershipScreenImage src={data.image} />
        </PartnershipRightBox>
      </PartnershipInnerContainer>
    </PartnershipContainer>
  );
}

export default B2BEcoProducts;
