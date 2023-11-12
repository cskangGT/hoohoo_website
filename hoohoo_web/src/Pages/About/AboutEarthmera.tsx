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
  -webkit-overflow-scrolling: touch;
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
function AboutEarthmera() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
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
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const data: DataStructure = i18next.t('AboutEarthMera', { returnObjects: true });
    return (
        <BgImage>
            <Wrapper>
                    <LottieBox href='#partners'>
                        <Lottie animationData={arrow} loop={true} />
                    </LottieBox>
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
export default AboutEarthmera