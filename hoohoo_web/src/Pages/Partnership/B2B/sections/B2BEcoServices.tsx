import i18next from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import { emailTo } from '../../../../util/email';
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

function B2BEcoServices() {
  const navigate = useNavigate();
  const data: any = i18next.t('B2BEcoServices', {returnObjects: true});
  function goPlatform() {
    navigate('/platform');
  }
  const {language} = useLanguage();
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
              href={emailTo}
              onClick={() => logButtonEvent('go_platform in B2BEcoServices', PageName.partnership)}
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

export default B2BEcoServices;
