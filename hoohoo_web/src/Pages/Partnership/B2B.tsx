import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Bubble from '../../Component/Bubble';
import Slider from '../../Component/ContentBox/Slider';
import LandingOrganizer from '../LandingPage/LandingOrganizer';
import LandingFestival from '../LandingPage/LandingFestival';

const SectionContainer = styled.section`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding-top: 20px;
  width: 100%;
  margin-top: 82px;
  @media screen and (max-width: 700px){
    margin-top: 40px;
  }
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

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
`;


const B2B: React.FC = () => {
    
    const [isBubble, setIsBubble] = useState<boolean>(true);

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
    const slides = [0, 1];
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleRightClick = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const toggleAutoSliding = (state: boolean) => {
        setIsAutoSliding(state);
    };
    useEffect(() => {
        let slideInterval: NodeJS.Timeout;
        if (isAutoSliding) {
            slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            }, 10000);
        }
        return () => {
            clearInterval(slideInterval);
        };
    }, [isAutoSliding]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <SectionContainer>
            <Inside>
            <Slider currentSlide={currentSlide}
                handleLeftClick={handleLeftClick}
                handleRightClick={handleRightClick}
                pageNumber={slides.length} isModalOpen={isOpen}>
                    {slides.map((slide, index) => (
                        <Slide>
                            {slide === 0 && <LandingFestival toggleAutoSliding={toggleAutoSliding} isOpen={isOpen} setIsOpen={setIsOpen}></LandingFestival>}
                            {slide === 1 && <LandingOrganizer toggleAutoSliding={toggleAutoSliding} isOpen={isOpen} setIsOpen={setIsOpen}></LandingOrganizer>}
                        </Slide>
                    ))}
                </Slider>
            </Inside>
            {isBubble ? <Bubble setIsBubble={setIsBubble} /> : <React.Fragment />}

        </SectionContainer >
        
    );
}

export default B2B;
