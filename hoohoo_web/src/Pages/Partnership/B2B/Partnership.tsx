import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FootContact from '../../../components/Footer/FootContact';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { BgImage, theme } from '../../../style';
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
  height: 800px;
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
  const location = useLocation();

  useEffect(() => {
    // 컴포넌트가 마운트된 후 약간의 지연을 주어 실행
    const timer = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const section = params.get('sc');
      
      if (section) {
        console.log("section", section);
        
        let element;
        switch(section) {
          case 'es':
            element = document.getElementById('eco-services');
            break;
          case 'ep':
            element = document.getElementById('eco-products');
            break;
          default:
            window.scrollTo(0, 0);
            return;
        }
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'  // 요소를 viewport의 상단에 맞춤
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100); // 100ms 지연

    return () => clearTimeout(timer); // 클린업 함수
  }, [location]);
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
          <Container id="eco-products">
            <B2BEcoProducts />
          </Container>
          <Container id="eco-services">
            <B2BEcoServices />
          </Container>
          <Container id="eco-board">
            <PartnershipEcoBoard />
          </Container>
          <Container id="eco-shop">
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
