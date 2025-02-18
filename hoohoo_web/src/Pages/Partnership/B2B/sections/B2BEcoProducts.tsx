import i18next from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import { logButtonEvent, PageName } from '../../../../util/firebase_custom_event';
import { HomeTransitionButton } from '../../../Home/styles';
import { ButtonBox } from '../PhotoVideoes';
import {
  PartnershipContainer,
  PartnershipDescText,
  PartnershipInnerContainer,
  PartnershipLeftBox,
  PartnershipRightBox,
  PartnershipScreenImage,
  PartnershipTitleText,
} from './PartnershipCarbonTracking';
function B2BEcoProducts() {
  const navigate = useNavigate();
  const data: any = i18next.t('B2BEcoProducts', {returnObjects: true});

  const {language} = useLanguage();
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailAddress = 'support@earthmera.com';
    window.location.href = `mailto:${emailAddress}`;
    logButtonEvent('ask_partnership in B2BEcoProducts', PageName.partnership)
    // 폴백(fallback) 처리
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`, '_blank');
    }, 300);
  };
  return (
    <PartnershipContainer>
      <PartnershipInnerContainer>
        <PartnershipLeftBox>
          <PartnershipTitleText
            language={language}
            dangerouslySetInnerHTML={{__html: data.title}}
          />
          <PartnershipDescText
            language={language}
            dangerouslySetInnerHTML={{__html: data.description}}
          />
          <ButtonBox>
            <HomeTransitionButton
              onClick={handleEmailClick}
              dangerouslySetInnerHTML={{
                __html: data.buttonText,
              }}></HomeTransitionButton>
          </ButtonBox>
        </PartnershipLeftBox>
        <PartnershipRightBox>
          <PartnershipScreenImage src={data.image} />
        </PartnershipRightBox>
      </PartnershipInnerContainer>
    </PartnershipContainer>
  );
}

export default B2BEcoProducts;
