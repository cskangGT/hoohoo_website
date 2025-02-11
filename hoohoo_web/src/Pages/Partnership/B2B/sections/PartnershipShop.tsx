import i18next from 'i18next';
import React from 'react';
import { useLanguage } from '../../../../Component/hooks/LanguageContext';
import Wrapper from '../../../../Component/Wrapper/Wrapper';
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

function PartnershipShop() {
  const data: any = i18next.t('PartnershipShop', {returnObjects: true});
  const {language} = useLanguage();
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
                href={emailTo}
                onClick={() => logButtonEvent('go_platform in PartnershipShop', PageName.partnership)}
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
