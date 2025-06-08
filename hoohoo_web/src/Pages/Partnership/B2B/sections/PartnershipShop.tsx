import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {useLanguage} from '../../../../components/hooks/LanguageContext';
import Wrapper from '../../../../components/Wrapper/Wrapper';
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
const PartnershipShopScreenImage = styled(PartnershipScreenImage)`
  width: 90%;
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 850px) {
    width: 80%;
  }
`;

function PartnershipShop() {
  const data: any = i18next.t('PartnershipShop', {returnObjects: true});
  const {language} = useLanguage();
  const handleEmailClick = (e: React.MouseEvent) => {
    logButtonEvent('go_platform in PartnershipShop', PageName.partnership);
  };
  return (
    <PartnershipContainer>
      <Wrapper>
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
                onClick={handleEmailClick}
                href={`/${i18next.language}/business_support?product=earthmera&type=nearbyStore`}>
                {data.buttonText}
              </HomeTransitionButton>
            </ButtonBox>
          </PartnershipLeftBox>
          <PartnershipRightBox>
            <PartnershipShopScreenImage src={data.image} />
          </PartnershipRightBox>
        </PartnershipInnerContainer>
      </Wrapper>
    </PartnershipContainer>
  );
}

export default PartnershipShop;
