import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../../style';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import Partners from './Partners';
import Realtime from './Realtime';
import TakeSteps from './TakeSteps';
import VisionIntro from './VisionIntro';
import IntroApp from './IntroApp';
import OurMission from './OurMission';
import Heros from './Heros';
import VisionSection from './VisionSection';
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

export const ContentBox = styled.div`
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
    useEffect(() => {
            window.scrollTo(0, 0);
      }, []);
    return (
        <BgImage bgcolor='#F6F4F1'> 
            <ContentBox>
                <VisionIntro />
            </ContentBox>
            <ContentBox>
                <IntroApp />
            </ContentBox>
            {/* <ContentBox>
                <VisionSection />
            </ContentBox> */}
            <ContentBox key="table" id="table">
                    <TakeSteps />
            </ContentBox>
            <BgImage bgcolor='#EFE7DF'> 
                <Wrapper>
                    <SmallTopContentBox>
                        <OurMission />
                    </SmallTopContentBox>
                    <ContentBox id="partners">
                        <Partners />
                    </ContentBox>
                </Wrapper>
            </BgImage>
                    {/* <LottieBox href='#partners'>
                        <Lottie animationData={arrow} loop={true} />
                    </LottieBox> */}
            <Wrapper>
                
    
                <ContentBox>
                    <FlexBox>
                        <Realtime />
                    </FlexBox>
                </ContentBox>
                <SmallTopContentBox>
                    <Heros />
                </SmallTopContentBox>
                
                
            </Wrapper>
            
        </BgImage>
    )
}