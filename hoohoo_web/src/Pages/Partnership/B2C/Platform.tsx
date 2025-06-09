import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {BgImage, theme} from '../../../style';

import i18next from 'i18next';
import {useLocation} from 'react-router-dom';
import FootContact from '../../../components/Footer/FootContact';
import Community from '../components/Community';
import B2CEcoProducts from './sections/B2CEcoProducts';
import B2CEcoServices from './sections/B2CEcoServices';
import B2cIntroSection from './sections/B2cIntroSection';
import Badges from './sections/Badges';
import EcoActionCategories from './sections/EcoActionCategories';
import EcoActionProcess from './sections/EcoActionProcess';
import HealthSection from './sections/HealthSection';
import LifeStyleSection from './sections/LifeStyleSection';
import Rewards from './sections/Rewards';
import YourImpactSection from './sections/YourImpactSection';
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
const AbsImage = styled.img``;
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
    const hash = location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }

    // if (location.hash === '#action' && sectionRef.current) {
    //   sectionRef.current.scrollIntoView({behavior: 'smooth'});
    // }
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
        <ContentBox id="eco-action-categories">
          <EcoActionCategories></EcoActionCategories>
        </ContentBox>
        <Wrapper>
          <ShortContentBox id="badges">
            <Badges />
          </ShortContentBox>
          {/* <NoHeight>
                    <CategorySection />
                </NoHeight> */}
          <ShortContentBox id="eco-impact">
            <YourImpactSection />
          </ShortContentBox>
          <ShortContentBox id="eco-products">
            <B2CEcoProducts />
          </ShortContentBox>
          <ShortContentBox id="eco-services">
            <B2CEcoServices />
          </ShortContentBox>

          <ShortContentBox id="rewards">
            <Rewards />
          </ShortContentBox>
          <ShortContentBox id="group-activity">
            <Community
              data={data[0]}
              index={0}
              imageWidth={'90%'}
              imageHeight={600}
            />
          </ShortContentBox>
          <ShortContentBox id="health">
            <HealthSection />
          </ShortContentBox>
          <ShortContentBox id="share-your-action">
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
