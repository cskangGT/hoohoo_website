import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroSection from './IntroSection';


import { BgImage, theme } from '../../style';
import IntroEarth from './IntroEarth';
import { ContentBox } from '../About/Vision/EarthMeraVision';
import VideoSection from './Video';
import Download from './Download';
import { useLocation } from 'react-router-dom';
import FootContact from '../../Component/Footer/FootContact';
import HomeIntroPage from './HomeIntroPage';
import HomePlatform from './HomePlatform';
import HomePartnership from './HomePartnership';
import HomeTicketeer from './HomeTicketeer';
import { countVisitor, getVisitor } from '../../api/counter';
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


function HomeEarthmera() {
  const location = useLocation();
    const sectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      console.log('HomeEarthmera mounted');
  
      // const fetchCounter = async () => {
      //   const result = await countVisitor();
      //   console.log('countVisitor result', result);
      // }
  
      // const getCounter = async () => {
      //   const result = await getVisitor();
      //   console.log('getVisitor result', result);
      // }
  
      // fetchCounter();
      // getCounter();
  
      return () => {
        console.log('HomeEarthmera unmounted');
      };
    }, []);
    useEffect(() => {
      
      if (location.hash === '#download' ){
          setTimeout(() => {
              if (sectionRef.current) {
                  sectionRef.current.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
        
      } else {
          window.scrollTo(0, 0);
      }
    }, [location]);
  return (
    <BgImage>
      <ContentBox>
        <HomeIntroPage></HomeIntroPage>
      </ContentBox>
      <ContentBox>
        <HomePlatform></HomePlatform>
      </ContentBox>
      <ContentBox>
        <HomePartnership></HomePartnership>
      </ContentBox>
      <ContentBox>
        <HomeTicketeer></HomeTicketeer>
      </ContentBox>
      <Wrap>
        {/* <IntroSection /> */}
        {/* <IntroEarth /> */}
        <ContentBox key="video" id="video">
          <VideoSection />
        </ContentBox>
        <ContentBox ref={sectionRef} id="download" key="download">
            <Download dropb={false} />
        </ContentBox>
        <hr style={{ color: theme.darkGray, margin: 0 }} />
      <FootContact />
      </Wrap>
    </BgImage>
  );
}
export default memo(HomeEarthmera); 