import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
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

function B2BEcoServices() {
  const navigate = useNavigate();
  const data: any = i18next.t('B2BEcoServices', {returnObjects: true});

  const {language} = useLanguage();
  const handleEmailClick = () => {
    logButtonEvent('ask_partnership in B2BEcoServices', PageName.partnership);
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
              href={`/${i18next.language}/business_support?product=earthmera&type=ecoService`}
              onClick={handleEmailClick}>
              {data.buttonText}
            </HomeTransitionButton>
          </ButtonBox>
        </PartnershipLeftBox>
        <PartnershipRightBox>
          <PartnershipScreenImage src={data.image} />
        </PartnershipRightBox>
      </PartnershipInnerContainer>
    </PartnershipContainer>
  );
}

export default B2BEcoServices;
