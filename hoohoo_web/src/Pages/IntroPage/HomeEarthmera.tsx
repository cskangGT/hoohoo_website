import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroSection from './IntroSection';


import { BgImage } from '../../style';
import IntroEarth from './IntroEarth';
import { ContentBox } from '../About/Vision/EarthMeraVision';
import VideoSection from './Video';
import Download from './Download';
import { useLocation } from 'react-router-dom';
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
        console.log('location.hash', location.hash)
        
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
      <Wrap>
        <IntroSection />
        <IntroEarth />
        <ContentBox key="video" id="video">
          <VideoSection />
        </ContentBox>
        <ContentBox ref={sectionRef} id="download" key="download">
                    <Download dropb={false} />
                </ContentBox>
      </Wrap>
    </BgImage>
  );
}
export default HomeEarthmera; 