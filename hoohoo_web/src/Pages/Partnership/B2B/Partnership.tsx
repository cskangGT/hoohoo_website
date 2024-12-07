import React, {useEffect} from 'react';
import styled from 'styled-components';
import FootContact from '../../../Component/Footer/FootContact';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {BgImage, theme} from '../../../style';
import B2BIntroSection from './B2BIntroSection';
import EMBags from './EMBags';
import GetInTouch from './GetInTouch';
import PhotoVideoes from './PhotoVideoes';
import PartnershipCarbonTracking from './sections/PartnershipCarbonTracking';
import PartnershipShop from './sections/PartnershipShop';
import PartnershipEcoBoard from './sections/PartnershipEcoBoard';
const IntroPageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1000px;
  @media screen and (max-width: 1200px) {
    height: auto;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`;

function Partnership() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BgImage>
        <Wrapper>
          <IntroPageSection>
            <B2BIntroSection></B2BIntroSection>
            {/* <ConstructionText>{"Our partnership will be released soon :)"}</ConstructionText> */}
          </IntroPageSection>
        </Wrapper>
        <Container>
          <PartnershipCarbonTracking />
        </Container>
        <Wrapper>
        <Container>
            <PartnershipEcoBoard />
          </Container>
          <Container>
            <PartnershipShop />
          </Container>
        </Wrapper>
        {/* <Container>
          <PhotoVideoes></PhotoVideoes>
        </Container>
        <Container>
          <EMBags></EMBags>
        </Container>
        <Container>
          <GetInTouch />
        </Container> */}

        {/* <PartnershipIntro />
          <ContentBox>
            <ESG />
          </ContentBox>
          <ContentBox>
            <DataOffer />
          </ContentBox>
          <ContentBox>
            <HowWork></HowWork>
          </ContentBox>
          <ContentBox>
           <UsingB2C />
          </ContentBox>
          <ContentBox>
            <Solutions /> 
          </ContentBox>
          <ContentBox>
            <B2BVideo />
          </ContentBox> */}
      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}
export default Partnership;
