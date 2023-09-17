import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
import Lottie from "lottie-react";
import arrow from './arrow-ani.json';
import Bubble from '../../Component/Bubble';

const SectionContainer = styled.section`
    display: flex;
    height:940px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    margin-top: 82px;
    @media screen and (max-width: 1100px) {
        height: auto;
    }
`;
const Inside = styled.div`
    position: relative;
    overflow: hidden;
  max-width: 1320px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    // padding-bottom: 50px;
    margin-left: 15px;
}
`;
const IntroText = styled.div`
  display:flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 55%;
  margin-top: 20px;
  padding-left: 20px;
  `;

const IntroTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 3.3rem;
  color: ${theme.white};
  font-weight:bold;
  text-align: center;
  @media screen and (max-width: 1100px) {
    font-size: 46px;
}
    @media screen and (max-width: 500px) {
        font-size: 34px;
        margin-bottom: 1rem;
    }
`;

const FirstDesc = styled.h1`
text-align: center;
  font-size: 5.0rem;
  font-weight:400;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: ${theme.white};
  @media screen and (max-width: 1100px) {
    font-size: 54px;
    margin-bottom: 2rem;
}
@media screen and (max-width: 500px) {
    font-size: 35px;
    margin-bottom: 1.5rem;
}
`;
const SecondDesc = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 4.5rem;
  line-height: 1.3;
  color: ${theme.white};
  text-align: center;
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-bottom: 2.5rem;
}
@media screen and (max-width: 500px) {
    font-size: 16px;
    margin-bottom: 1.2rem;
}
`;
const LeftImage = styled.img`
    padding-top: 200px;
  max-width: 150px;
  min-width: 100px;
  height: auto;

`;
const RightImage = styled.img`

  padding: 0 20px;
  height: auto;
  width: 45%;
  @media screen and (max-width: 1100px) {
      width: 60%;
  }
`;
interface SlideContainerProps {
    currentSlide: number;
}
const SlideContainer = styled.div<SlideContainerProps>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(-${props => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
`;
const LottieBox = styled.a`
    width: 70px;
    height:70px;
    bottom: 3px;
    position: absolute;
`;

interface DataStructure {
    [key: string]: {
        firstDesc: string;
        secondDesc: string;
    };
}
const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.white};
  font-size: 2rem;
  z-index: 10;

  &:focus {
    outline: none;
  }
`;
const data: DataStructure = {
    "Images/1__.svg": {
        "firstDesc": "CAPTURE AND BE REWARDED",
        "secondDesc": "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
    },
    "Images/preview.png": {
        "firstDesc": "CAPTURE AND BE REWARDED",
        "secondDesc": "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
    }
}
const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;
const IntroSection: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isBubble, setIsBubble] = useState<boolean>(true);
    const images = Object.keys(data);
    const handleLeftClick = () => {
        if (currentSlide === 1) {
            setCurrentSlide(0);
        }
    };

    // 오른쪽 화살표 버튼 클릭 핸들러
    const handleRightClick = () => {
        if (currentSlide === 0) {
            setCurrentSlide(1);
        }
    };
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            handleRightClick();
        },
        onSwipedRight: () => {
            handleLeftClick();
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    });
    // const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 10000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [images.length]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (<SectionContainer>
        <Inside {...handlers} >
            {currentSlide === 1 && <LeftArrow onClick={handleLeftClick} >&lt; </LeftArrow>}

            <SlideContainer currentSlide={currentSlide} >
                {
                    images.map((imagePath, index) => (<Slide key={index}>
                        {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
                            <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />}
                        <IntroText >
                            <IntroTitle>EARTHMERA</IntroTitle>
                            <FirstDesc >
                                {data[imagePath].firstDesc}
                            </FirstDesc>
                            <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
                        </IntroText>
                        {
                            imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                                : <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxHeight: 800 }} />
                        }

                    </Slide>))}
            </SlideContainer>
            {currentSlide === 0 && <RightArrow onClick={handleRightClick} >&gt; </RightArrow>}

        </Inside>
        <LottieBox href='#next'>
            <Lottie animationData={arrow} loop={true} />
        </LottieBox>
        {isBubble ? <Bubble setIsBubble={setIsBubble} /> : <React.Fragment />}

        {/* : <Inside>
                <IntroText>
                    <IntroTitle>EARTHMERA</IntroTitle>
                    <FirstDesc>
                        CAPTURE AND BE REWARDED
                    </FirstDesc>
                    <SecondDesc>
                        CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER.
                    </SecondDesc>
                </IntroText >
                <RightImage src="Images/1__.svg" alt="앱 소개 이미지" />
            </Inside> */}
    </SectionContainer >
    );
}

export default IntroSection;