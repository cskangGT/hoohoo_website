import i18next from 'i18next';
import React from 'react';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import Wrapper from '../../../../components/Wrapper/Wrapper';
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

function PartnershipShop() {
  const data: any = i18next.t('PartnershipShop', {returnObjects: true});
  const {language} = useLanguage();
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailAddress = 'support@earthmera.com';
    window.location.href = `mailto:${emailAddress}`;
    logButtonEvent('go_platform in PartnershipShop', PageName.partnership);
    // 폴백(fallback) 처리
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`, '_blank');
    }, 300);
  };  
  return (
    <PartnershipContainer>
      <Wrapper>
        <PartnershipInnerContainer>
          <PartnershipLeftBox>
            <PartnershipTitleText
              language={language}
              dangerouslySetInnerHTML={{__html: data.title}}
            />
            <PartnershipDescText
              language={language}
              dangerouslySetInnerHTML ={{__html: data.description}}
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
      </Wrapper>
    </PartnershipContainer>
  );
}

export default PartnershipShop;
