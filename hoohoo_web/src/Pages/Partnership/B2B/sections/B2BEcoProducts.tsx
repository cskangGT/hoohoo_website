import i18next from 'i18next';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useLanguage} from '../../../../Component/hooks/LanguageContext';
import {emailTo} from '../../../../util/email';
import {HomeTransitionButton} from '../../../Home/HomeIntroPage';
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

function B2BEcoProducts() {
  const navigate = useNavigate();
  const data: any = i18next.t('B2BEcoProducts', {returnObjects: true});
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
            dangerouslySetInnerHTML={{__html: data.description}}
          />
          <ButtonBox>
            <HomeTransitionButton
              href={emailTo}
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
