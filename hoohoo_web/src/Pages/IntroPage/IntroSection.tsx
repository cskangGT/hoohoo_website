import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
import Lottie from "lottie-react";
import arrow from './arrow-ani.json';
import Bubble from '../../Component/Bubble';
import i18next from 'i18next';
import Slider from '../../Component/ContentBox/Slider';
import LandingOrganizer from '../LandingPage/LandingOrganizer';
import LandingFestival from '../LandingPage/LandingFestival';
const SectionContainer = styled.section`
    display: flex;
    height: 900px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    margin-top: 82px;
    @media screen and (max-width: 1100px) {
        height: 900px;
    }
    @media screen and (max-width: 700px) {
        height: 700px;
    }
`;
const Inside = styled.div`
    position: relative;
    overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    // padding-bottom: 50px;
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
const LottieBox = styled.a`
    width: 70px;
    height:70px;
    bottom: 3px;
    position: absolute;
`;
const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
`;

const SlideContent: React.FC<{ data: any, windowWidth: number, slide: number }> = ({ data, windowWidth, slide }) => {
    console.log('slide', slide)
    return (
        <Slide>
            {slide === 0 && <LandingFestival></LandingFestival>}
            {slide === 1 && <LandingOrganizer></LandingOrganizer>}
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
    const numImage = 2;
    const handleSwipe = () => {
        setIsAutoSliding(false); // 사용자가 스와이프를 하면 자동 슬라이드 변경 로직 중지
        setTimeout(() => {
            setIsAutoSliding(true); // 일정 시간 후에 자동 슬라이드 변경 로직 재시작
        }, 5000); // 원하는 지연 시간을 설정합니다 (여기서는 5초)
    };
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleRightClick = () => {
        if (currentSlide < numImage - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("Swiped Left");
            handleRightClick();
            handleSwipe();
        },
        onSwipedRight: () => {
            // console.log("Swiped Right");
            // handleLeftClick();
            handleSwipe();
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        swipeDuration: 300,
        delta: { left: 50, right: 50 }
    });



    useEffect(() => {
        let slideInterval: NodeJS.Timeout;
        if (isAutoSliding) { // 자동 슬라이드 변경 로직이 활성화된 경우에만 setInterval 실행
            slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % numImage);
            }, 5000);
        }

        return () => {
            clearInterval(slideInterval); // 컴포넌트가 언마운트되거나 useEffect가 다시 실행되기 전에 setInterval을 클리어합니다.
        };
    }, [images.length, isAutoSliding]);
    const arr = [0, 1];
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
                    pageNumber={numImage} >
                    {arr.map((slide, index) => (<SlideContent data={data} windowWidth={windowWidth} slide={slide} />))}

                    {/* {currentSlide === 0 && <LandingFestival />}
                    {currentSlide === 1 && <LandingOrganizer />} */}

                    {/* {images.map((imagePath, index) => (
                    ))} */}
                </Slider>
            </Inside>
            <LottieBox href='#partners'>
                <Lottie animationData={arrow} loop={true} />
            </LottieBox>
            {isBubble ? <Bubble setIsBubble={setIsBubble} /> : <React.Fragment />}

        </SectionContainer >
    );
}

export default IntroSection;
