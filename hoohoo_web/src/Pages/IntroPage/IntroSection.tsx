import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
import Lottie from "lottie-react";
import arrow from './arrow-ani.json';
import Bubble from '../../Component/Bubble';
import i18next from 'i18next';
import Slider from '../../Component/ContentBox/Slider';
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
const IntroText = styled.div`
  display:flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 55%;
  margin-top: 20px;
  padding-left: 20px;
  @media screen and (max-width: 700px) {
    width: 100%;
    padding: 0;
        flex-direction: column;
        /* margin-bottom: 20rem; */
    }
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
    @media screen and (max-width: 700px) {
        font-size: 34px;
        margin-bottom: 1rem;
    }
`;

const FirstDesc = styled.h1`
text-align: center;
  font-size: 5.0rem;
  font-weight:700;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: ${theme.white};
  @media screen and (max-width: 1100px) {
    font-size: 54px;
    margin-bottom: 2rem;
}
@media screen and (max-width: 700px) {
    font-size: 35px;
    margin-bottom: 1.5rem;
}
`;
const SecondDesc = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 4.5rem;
  line-height: 1.3;
  color: ${theme.white};
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-bottom: 2.5rem;
    }
    @media screen and (max-width: 700px) {
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
  width: 40%;
  @media screen and (max-width: 1100px) {
      width: 60%;
  }
  @media screen and (max-width: 700px) {
    padding: 0;
      width: 85%;
      align-self: center;
  }
`;
const Screen = styled.img`
    padding: 0 20px;
  height: auto;
  width: 40%;
  @media screen and (max-width: 1100px) {
      width: 60%;
  }
  @media screen and (max-width: 700px) {
    padding: 0;
    width: 45%;
      align-self: center;
  }
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
        "header": string;
        firstDesc: string;
        secondDesc: string;
    };
}
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.img`
    width: 80%;
`;

const Col = styled.div`
  display: flex;
  @media screen and (max-width: 700px) {
        flex-direction: column-reverse;
    }
`;
const SlideContent: React.FC<{ imagePath: string, data: any, windowWidth: number }> = ({ imagePath, data, windowWidth }) => {
    // 여기에 슬라이드의 내용을 적용하세요.
    return (
        <Slide key={imagePath}>
            {imagePath === "Images/Banner.png" ?
                <BannerContainer>
                    <Banner src={imagePath} />
                </BannerContainer> : <Col>
                    {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
                        <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />}
                    <IntroText>
                        <IntroTitle>{data[imagePath]["header"]}</IntroTitle>
                        <FirstDesc >
                            {data[imagePath].firstDesc}
                        </FirstDesc>
                        <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
                    </IntroText>
                    {
                        imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                            : <Screen src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxWidth: windowWidth < 700 ? 'auto' : 350 }} />
                    }</Col>
            }
        </Slide>
    );
};
const IntroSection: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isBubble, setIsBubble] = useState<boolean>(true);
    const data: DataStructure = i18next.t('IntroPage', { returnObjects: true });
    const images = Object.keys(data);
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleRightClick = () => {
        if (currentSlide < images.length - 1) {
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
    // const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 1000000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [images.length]);

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
            <Inside {...handlers} >
                <Slider currentSlide={currentSlide}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    pageNumber={images.length} >
                    {images.map((imagePath, index) => (
                        <SlideContent key={index} imagePath={imagePath} data={data} windowWidth={windowWidth} />
                    ))}
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

// {currentSlide === 1 && <LeftArrow onClick={handleLeftClick} >&lt; </LeftArrow>}

//             <SlideContainer currentSlide={currentSlide} >
//                 {
//                     images.map((imagePath, index) => (<Slide key={index}>
//                         {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
//                             <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />}
//                         <IntroText >
//                             <IntroTitle>EARTHMERA</IntroTitle>
//                             <FirstDesc >
//                                 {data[imagePath].firstDesc}
//                             </FirstDesc>
//                             <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
//                         </IntroText>
//                         {
//                             imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
//                                 : <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxHeight: 800 }} />
//                         }

//                     </Slide>))}
//             </SlideContainer>
//             {currentSlide === 0 && <RightArrow onClick={handleRightClick} >&gt; </RightArrow>}
