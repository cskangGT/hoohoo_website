import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../style';
import Lottie from "lottie-react";
import arrow from './arrow-ani.json';
import Wrapper from '../../Component/Wrapper/Wrapper';
import Slider from '../../Component/ContentBox/Slider';
import i18next from 'i18next';
import ListSection from './ListSection';
import VideoSection from './Video';
import Download from './Download';
import Partners from './Partners';
import Realtime from './Realtime';
import TakeSteps from './TakeSteps';
import { slideInFromTop } from '../../style';
import { useLocation } from 'react-router-dom';
import VisionIntro from './VisionIntro';
import IntroApp from './IntroApp';
import OurMission from './OurMission';
import Heros from './Heros';
import FutureModel from './FutureModel';
const FlexBox = styled.div`
   display:flex;
    flex-direction: column;
    width: calc(100% - 20px);
    padding: 30px 0px;
    margin: 20px 10px;
    background-color: rgba(57,62,70, 0.25);
    border-radius: 40px;
    position: relative;
    overflow: hidden;
`;

const ContentBox = styled.div`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 50px;
  -webkit-overflow-scrolling: touch;
`;
const SmallTopContentBox = styled(ContentBox)`
  margin-top:20px;
`;
const LottieBox = styled.a`
    width: 70px;
    height:70px;
    bottom: 3px;
    position: absolute;
`;
interface DataStructure {
    secondImages: ImageProps[];
    slides: SlideData;
}
interface SlideData {
    [key: string]: {
        firstDesc?: string;
        secondDesc?: string;
    };
}
type ImageProps = {
    imagePath: string;
    head: string;
    desc: string;
}
export default function EarthMeraVision() {
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
        <BgImage bgcolor='#EFE7DF'> 
            <ContentBox>
                <VisionIntro />
            </ContentBox>
            <ContentBox>
                <IntroApp />
            </ContentBox>
                <Wrapper>
                    <SmallTopContentBox>
                        <OurMission />
                    </SmallTopContentBox>
                    {/* <LottieBox href='#partners'>
                        <Lottie animationData={arrow} loop={true} />
                    </LottieBox> */}
                    <SmallTopContentBox>
                        <Heros />
                    </SmallTopContentBox>
                    <ContentBox>
                        <FutureModel />
                    </ContentBox>
                <ContentBox id="partners">
                    <Partners />
                </ContentBox>
                <FlexBox>
                    <Realtime />
                </FlexBox>
                <ContentBox key="table" id="table">
                    <TakeSteps />
                </ContentBox>
                <ContentBox key="video" id="video">
                    <VideoSection />
                </ContentBox>
                <ContentBox ref={sectionRef} id="download" key="download">
                    <Download dropb={false} />
                </ContentBox>
                </Wrapper>
        </BgImage>
    )
}