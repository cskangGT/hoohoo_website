import i18next from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../Component/hooks/LanguageContext';
import { emailTo } from '../../../../util/email';
import { logButtonEvent, PageName } from '../../../../util/firebase_custom_event';
import { HomeTransitionButton } from '../../../Home/HomeIntroPage';
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

function PartnershipEcoBoard() {
  const navigate = useNavigate();
  const data: any = i18next.t('PartnershipEcoBoard', {returnObjects: true});
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
              onClick={() => logButtonEvent('go_platform in PartnershipEcoBoard', PageName.partnership)}
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

export default PartnershipEcoBoard;
