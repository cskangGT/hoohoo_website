import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {BgImage, theme} from '../../../style';

import i18next from 'i18next';
import {useLocation} from 'react-router-dom';
import FootContact from '../../../Component/Footer/FootContact';
import B2cIntroSection from './B2cIntroSection';
import Badges from './Badges';
import Community from './Community';
import EcoActionCategories from './EcoActionCategories';
import EcoActionProcess from './EcoActionProcess';
import Rewards from './Rewards';
import YouImpactSection from './YouImpactSection';
import HealthSection from './HealthSection';
import LifeStyleSection from './LifeStyleSection';
const IntroBox = styled.section`
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 80px;
`;
const ContentBox = styled.div`
  width: calc(100%);
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 40px;
    height: auto;
  }
`;
const ProgressContentBox = styled.div`
  width: calc(100%);
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1400px) {
    margin-bottom: 40px;
    height: auto;
  }
`;
const ShortContentBox = styled.div`
  width: calc(100%);
  height: 700px;
  display: flex;
  
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 40px;
    height: auto;
  }
`;
const ImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
        display: none;
    }
`;
const AbsImage = styled.img`
  
`;
const NoHeight = styled(ContentBox)`
  height: auto;
`;
function Platform() {
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (location.hash === '#action' && sectionRef.current) {
      sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [location]);
  const data: any = i18next.t('community', {returnObjects: true});

  return (
    <>
      <BgImage>
        {/* <IntroBox>
               <PlatformIntro />
            </IntroBox> */}
        <IntroBox>
          <B2cIntroSection></B2cIntroSection>
        </IntroBox>
        <ProgressContentBox ref={sectionRef} id="action">
          <EcoActionProcess />
        </ProgressContentBox>
        <ContentBox>
          <EcoActionCategories></EcoActionCategories>
        </ContentBox>
        <Wrapper >
          <ShortContentBox>
            <Badges />
          </ShortContentBox>
          {/* <NoHeight>
                    <CategorySection />
                </NoHeight> */}
          <ShortContentBox>
            <YouImpactSection />
          </ShortContentBox>
          <ShortContentBox>
            <Rewards />
          </ShortContentBox>
          <ShortContentBox >
        <Community data={data[0]} index={0} imageHeight={800} />
        </ShortContentBox>
        <ShortContentBox >
            <HealthSection />
        </ShortContentBox>
        <ShortContentBox>
            <LifeStyleSection />
        </ShortContentBox>
          {/* {data.map((item: any, index: number) => (
              <ShortContentBox key={index}>
                <Community data={item} index={index} />
              </ShortContentBox>
            ))} */}
        </Wrapper>


      </BgImage>
      <hr style={{color: theme.darkGray, margin: 0}} />
      <FootContact />
    </>
  );
}
export default Platform;
