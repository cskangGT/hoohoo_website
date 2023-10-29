import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Bubble from '../../Component/Bubble';
import i18next from 'i18next';
import Slider from '../../Component/ContentBox/Slider';
import LandingOrganizer from '../LandingPage/LandingOrganizer';
import LandingFestival from '../LandingPage/LandingFestival';
import LandingB2C from '../LandingPage/LandingB2C';
const SectionContainer = styled.section`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    margin-top: 42px;
    border-radius: 20px;
`;
const Inside = styled.div`
    overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 30px;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-left: 15px;
    }
    @media screen and (max-width: 700px) {
        justify-content: center;
        flex-direction: column;
        margin-left: 0;
    }
`;
interface DataStructure {
    [key: string]: {
        "header": string;
        "firstDesc": string;
        "secondDesc": string;
    };
}

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
`;

const SlideContent: React.FC<{ data: any, windowWidth: number, slide: number }> = ({ data, windowWidth, slide }) => {
    console.log('slide', slide)
    return (
        <Slide>
            {slide === 2 && <LandingB2C></LandingB2C>}
            {slide === 1 && <LandingOrganizer></LandingOrganizer>}
            {slide === 0 && <LandingFestival></LandingFestival>}
        </Slide>
    );
};

const IntroSection: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isBubble, setIsBubble] = useState<boolean>(true);
    const data: DataStructure = i18next.t('IntroPage', { returnObjects: true });
    const images = Object.keys(data);
    const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
    const slide = [0, 1, 2];

    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleRightClick = () => {
        if (currentSlide < slide.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    useEffect(() => {
        let slideInterval: NodeJS.Timeout;
        if (isAutoSliding) {
            slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slide.length);
            }, 100000);
        }
        return () => {
            clearInterval(slideInterval);
        };
    }, [images.length, isAutoSliding]);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <SectionContainer>
            <Inside>
                <Slider currentSlide={currentSlide}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    pageNumber={slide.length} >
                    {slide.map((slide, index) => (<SlideContent data={data} windowWidth={windowWidth} slide={slide} />))}
                </Slider>
            </Inside>
            {isBubble ? <Bubble setIsBubble={setIsBubble} /> : <React.Fragment />}

        </SectionContainer >
    );
}

export default IntroSection;
