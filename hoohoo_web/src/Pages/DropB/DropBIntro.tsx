import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
import Slider from '../../Component/ContentBox/Slider';

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

const data: DataStructure = {
    "Images/preview.png": {
        "firstDesc": "CAPTURE AND BE REWARDED",
        "secondDesc": "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
    }
}


const SlideContent: React.FC<{ imagePath: string, data: any, windowWidth: number }> = ({ imagePath, data, windowWidth }) => {
    // 여기에 슬라이드의 내용을 적용하세요.
    return (
        <Slide key={imagePath}>
            <IntroText>
                <IntroTitle>DropB</IntroTitle>
                <FirstDesc >
                    {data[imagePath].firstDesc}
                </FirstDesc>
                <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
            </IntroText>
            {
                imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                    : <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxHeight: 800 }} />
            }
        </Slide>

    );
};
const DropBIntro: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slides = Object.keys(data);
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // 오른쪽 화살표 버튼 클릭 핸들러
    const handleRightClick = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
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

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [slides.length]);

    return (<SectionContainer>
        <Inside {...handlers} >
            <Slider currentSlide={currentSlide}
                handleLeftClick={handleLeftClick}
                handleRightClick={handleRightClick}
                pageNumber={slides.length} >
                {slides.map((imagePath, index) => (
                    <SlideContent key={index} imagePath={imagePath} data={data} windowWidth={windowWidth} />
                ))}
            </Slider>
        </Inside>
    </SectionContainer >
    );
}

export default DropBIntro;