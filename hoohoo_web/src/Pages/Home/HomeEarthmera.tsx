import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import {useLocation, useNavigate} from 'react-router-dom';
import FootContact from '../../Component/Footer/FootContact';
import {BgImage, theme} from '../../style';
import {ContentBox} from '../About/Vision/EarthMeraVision';
import Download from './Download';
import HomeIntroPage from './HomeIntroPage';

import HomePlatform from './HomePlatform';

import HomePlatformGroup from './sections/HomePlatformGroup';
import HomePlatformShare from './sections/HomePlatformShare';
import HomePartnership from './sections/HomePartnership';
import HomeLandingSection from './sections/HomeLandingSection';
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('modal') === 'open') {
      setIsOpen(true);
    } else if (searchParams.get('support') === 'yes') {
      navigate('/support');
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
      <BgImage bgcolor={"#F2F2F7 !important"}>
      <IntroContentBox>
        <HomeLandingSection />
      </IntroContentBox>
      </BgImage>
      <ContentBox>
        <HomePlatform></HomePlatform>
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
        {/* <IntroSection /> */}
        {/* <IntroEarth /> */}
        {/* <ContentBox key="video" id="video">
          <VideoSection />
        </ContentBox> */}
        {/* <ContentBox ref={sectionRef} id="download" key="download">
          <Download dropb={false} />
        </ContentBox> */}
        <hr style={{color: theme.darkGray, margin: 0}} />
        <FootContact />
      </Wrap>
    </BgImage>
  );
}
export default HomeEarthmera;
