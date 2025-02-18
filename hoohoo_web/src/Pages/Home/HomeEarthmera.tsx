import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import i18next from 'i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import FootContact from '../../components/Footer/FootContact';
import { useLanguage } from '../../components/hooks/LanguageContext';
import OpenGraphMeta from '../../components/opengraph/OpenGraph';
import { BgImage, theme } from '../../style';
import { ContentBox } from '../About/Vision/EarthMeraVision';
import HomeEcoProducts from './sections/HomeEcoProducts';
import HomeEcoServices from './sections/HomeEcoServices';
import HomeEnvImpact from './sections/HomeEnvImpact';
import HomeLandingSection from './sections/HomeLandingSection';
import HomePartners from './sections/HomePartners';
import HomePartnership from './sections/HomePartnership';
import HomePlatformGroup from './sections/HomePlatformGroup';
import HomePlatformShare from './sections/HomePlatformShare';
const Wrap = styled.div`
  width: calc(100%);
  max-width: 1300px;
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    max-width: 1300px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 1200px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 850px;
  }

  @media screen and (max-width: 850px) {
    max-width: 750px;
  }

  @media screen and (max-width: 700px) {
    max-width: 550px;
  }

  @media screen and (max-width: 550px) {
    max-width: 400px;
  }
`;
const IntroContentBox = styled.div`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 0px;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;

function HomeEarthmera() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {language} = useLanguage();
  const data: any = i18next.t('HomeLandingSection', {returnObjects: true});
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('modal') === 'open') {
      setIsOpen(true);
    } else if (searchParams.get('support') === 'yes') {
      navigate(`/${language}/support`);
    }
  }, [location.search]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    if (hash) {
      // const [pageWithHash, query] = hash.split('?');
      // const page = pageWithHash.split('#')[0]; // 페이지 이름 추출
      // const params = new URLSearchParams(query);
      const [page, query] = hash.split('#?');
      const params = new URLSearchParams(query);
      const link = params.toString();

      if (link) {
        navigate(`/${page}?${link}`);
      } else {
        navigate(`/${page}`);
      }
    }
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  
  
  return (
    <BgImage>
      <OpenGraphMeta
        title={language === 'en' 
          ? "EarthMera | Make Eco-Actions Fun and Impactful" 
          : "어스메라 | 친환경 행동을 즐겁고 영향력 있게 만들어요"
        }
        description={language === 'en'
          ? "Join EarthMera and track your eco-friendly actions. Earn rewards while reducing your carbon footprint!"
          : "어스메라와 함께 친환경 행동을 추적하세요. 탄소 배출을 줄이면서 보상을 받아요!"
        }
        image={data.image}
        url={`https://www.earthmera.com/${language}/`}
        locale={language === 'en' ? 'en_US' : 'ko_KR'}
      />
      <BgImage bgcolor={'#F2F2F7 !important'}>
        <IntroContentBox>
          <HomeLandingSection />
        </IntroContentBox>
      </BgImage>
      <ContentBox>
        <HomeEnvImpact></HomeEnvImpact>
      </ContentBox>
      <ContentBox>
        <HomeEcoProducts />
      </ContentBox>
      <ContentBox>
        <HomeEcoServices />
      </ContentBox>
      <ContentBox>
        <HomePlatformGroup />
      </ContentBox>

      <ContentBox>
        <HomePlatformShare />
      </ContentBox>
      <ContentBox>
        <HomePartnership />
      </ContentBox>

      <Wrap>
        <ContentBox>
          <HomePartners />
        </ContentBox>
      </Wrap>
      {/* <IntroSection /> */}
      {/* <IntroEarth /> */}
      {/* <ContentBox key="video" id="video">
          <VideoSection />
        </ContentBox> */}
      {/* <ContentBox ref={sectionRef} id="download" key="download">
          <Download dropb={false} />
        </ContentBox> */}

      <hr style={{color: theme.darkGray, margin: 0, width: '100%'}} />
      <Wrap>
        <FootContact />
      </Wrap>
    </BgImage>
  );
}
export default HomeEarthmera;
