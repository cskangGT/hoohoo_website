import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FontFaces, { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
const SectionContainer = styled.section`
    display: flex;
    height:940px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1100px) {
        height: auto;
        box-sizing: border-box;
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
    padding-bottom: 50px;
    padding-left: 15px;
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
  margin-bottom: 20px;
  font-size: 3.5rem;
  color: ${theme.white};
  font-weight:bold;
  text-align: center;
  font-family: 'Myfont';
  @media screen and (max-width: 1100px) {
    font-size: 50px;
}
    @media screen and (max-width: 500px) {
        font-size: 34px;
        margin-bottom: 1rem;
    }
`;

const FirstDesc = styled.h1`
text-align: center;
  font-size: 5.2rem;
  font-weight:bold;
  line-height: 1.1;
  margin-bottom: 5rem;
  color: ${theme.white};
  @media screen and (max-width: 1100px) {
    font-size: 60px;
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
    font-size: 24px;
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
      width: 70%;
  }
`;
const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(-${props => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
`;
const data = {
    "Images/1__.svg": {
        firstDesc: "CAPTURE AND BE REWARDED",
        secondDesc: "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
    },
    "Images/preview.png": {
        firstDesc: "CAPTURE AND BE REWARDED",
        secondDesc: "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
    }
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

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;
const IntroSection = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState(0);
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
    // useEffect(() => {
    //     const slideInterval = setInterval(() => {
    //         setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    //     }, 3000);

    //     return () => {
    //         clearInterval(slideInterval);
    //     };
    // }, [images.length]);
    // onSwipedLeft: () => setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length),
    // onSwipedRight: () => setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length),
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            handleRightClick();
        },
        onSwipedRight: () => {
            handleLeftClick();
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    // const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect(() => {
    //     const slideInterval = setInterval(() => {
    //         setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    //     }, 3000);

    //     return () => {
    //         clearInterval(slideInterval);
    //     };
    // }, [images.length]);
    console.log('currentSlide', currentSlide)
    const imagePath = images[currentSlide];

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
        <Inside {...handlers}>
            <LeftArrow onClick={handleLeftClick}>&lt;</LeftArrow>
            <SlideContainer currentSlide={currentSlide}>
                {images.map((imagePath, index) => (<Slide key={index}>
                    {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
                        <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />
                    }
                    <IntroText>
                        <FontFaces />
                        <IntroTitle>EARTHMERA</IntroTitle>
                        <FirstDesc>
                            {data[imagePath].firstDesc}
                        </FirstDesc>
                        <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
                    </IntroText >
                    <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                </Slide>))}
            </SlideContainer>
            <RightArrow onClick={handleRightClick}>&gt;</RightArrow>
        </Inside>
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