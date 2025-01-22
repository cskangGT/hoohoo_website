import React, {useEffect} from 'react';
import styled from 'styled-components';
import FootContact from '../../../Component/Footer/FootContact';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {BgImage, theme} from '../../../style';
import B2BEcoProducts from './sections/B2BEcoProducts';
import B2BEcoServices from './sections/B2BEcoServices';
import B2BIntroSection from './sections/B2BIntroSection';
import PartnershipCarbonTracking from './sections/PartnershipCarbonTracking';
import PartnershipEcoBoard from './sections/PartnershipEcoBoard';
import PartnershipShop from './sections/PartnershipShop';
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
            <B2BIntroSection />
          </IntroPageSection>
        </Wrapper>
        <Container>
          <PartnershipCarbonTracking />
        </Container>
        <Wrapper>
          <Container>
            <B2BEcoProducts />
          </Container>
          <Container>
            <B2BEcoServices />
          </Container>
          <Container>
            <PartnershipEcoBoard />
          </Container>
          <Container>
            <PartnershipShop />
          </Container>
        </Wrapper>
      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}
export default Partnership;
