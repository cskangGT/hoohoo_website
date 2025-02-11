import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';

const Container = styled.div`
  width: 100%;
  padding: 0px 0px 70px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 80px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  @media screen and (max-width: 550px) {
    width: 90%;
  }
`;

const DescriptionText = styled.h5`
  font-size: ${theme.fontSize['3xl']};
  line-height: ${theme.fontSize['5xl']};
  color: ${theme.darkGray};
  font-weight: 500;
  margin: 0px;
  text-align: center;
  word-break: keep-all;
`;

const PartnerText = styled.h5`
  margin: 0px;
  font-size: ${theme.fontSize['xl']};
  font-weight: 400;
  color: ${theme.green};
`;

const GridBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 60px;
  row-gap: 80px;
  justify-content: center;
  width: 100%;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: contain;
`;

const HomePartners = () => {
  const logoImage = [
    'Images/logo/partner_logo1.png',
    'Images/logo/partner_logo2.png',
    'Images/logo/partner_logo3.png',
    'Images/logo/partner_logo4.png',
    'Images/logo/partner_logo5.png',
  ];
  const logoSecondLine = [
    'Images/logo/partner_logo6.png',
    'Images/logo/partner_logo7.png',
    'Images/logo/partner_logo8.png',
    'Images/logo/partner_logo9.png',
    'Images/logo/partner_logo10.png',
    'Images/logo/partner_logo11.png',
  ];
  const allLogos = [...logoImage, ...logoSecondLine];

  const data: any = i18next.t('HomePartners', {returnObjects: true});
  return (
    <Container>
      <TitleBox>
        <PartnerText>{data.title}</PartnerText>
        <DescriptionText dangerouslySetInnerHTML={{__html: data.description}} />
      </TitleBox>
      <GridBox>
        {allLogos.map((item, index) => (
          <LogoImage src={item} key={index} />
        ))}
      </GridBox>
    </Container>
  );
};

export default HomePartners;
