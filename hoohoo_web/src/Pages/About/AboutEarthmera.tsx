import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../style';
import Lottie from "lottie-react";
import arrow from './arrow-ani.json';
import Wrapper from '../../Component/Wrapper/Wrapper';
import Slider from '../../Component/ContentBox/Slider';
import i18next from 'i18next';
import NumberIconContent from '../../Component/ContentBox/NumberIconContent';
import ListSection from './ListSection';
import VideoSection from './Video';
import Download from './Download';
import Partners from './Partners';
import Rewards from './Rewards';
import Realtime from './Realtime';
import TakeSteps from './TakeSteps';
const SlideSection = styled.section`
    padding-top: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    height: 900px;
    overflow: hidden;

    @media screen and (max-width: 600px) {
        height: 850px;
    }
`;
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
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
const FirstDesc = styled.h1`
    text-align: center;
  font-size: 5.0rem;
  font-weight:700;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: ${theme.darkGray};
  text-transform: uppercase;
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
  color: ${theme.darkGray};
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-bottom: 2.5rem;
    }
    @media screen and (max-width: 700px) {
        font-size: 16px;
        margin-bottom: 1.2rem;
    }
`;

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

const SlideContent: React.FC<{ imagePath: string, data: any, windowWidth: number }> = ({ imagePath, data, windowWidth }) => {
    return (
        <Slide key={imagePath}>
            {imagePath === "Images/banner2.png" ?
                <BannerContainer>
                    <Banner src={imagePath} draggable="false" />
                </BannerContainer> :
                <Col>
                    {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
                        <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />}
                    <IntroText>
                        {/* <IntroTitle>{data[imagePath].header}</IntroTitle> */}
                        <FirstDesc >
                            {data[imagePath].firstDesc}
                        </FirstDesc>
                        <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
                    </IntroText>
                    {
                        imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                            : <Screen src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxWidth: windowWidth < 700 ? 'auto' : 350 }} />
                    }
                </Col>
            }
        </Slide>
    );
};
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
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const data: DataStructure = i18next.t('AboutEarthMera', { returnObjects: true });
    const images = Object.keys(data.slides);
    const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
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

    useEffect(() => {
        let slideInterval: NodeJS.Timeout;
        if (isAutoSliding) {
            slideInterval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
            }, 5000);
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <BgImage>
            <Wrapper>
                <SlideSection id="about">
                    <Slider currentSlide={currentSlide}
                        handleLeftClick={handleLeftClick}
                        handleRightClick={handleRightClick}
                        pageNumber={images.length}>
                        {images.map((imagePath, index) => (
                            <SlideContent key={index} imagePath={imagePath} data={data.slides} windowWidth={windowWidth} />
                        ))}
                    </Slider>
                    <LottieBox href='#partners'>
                        <Lottie animationData={arrow} loop={true} />
                    </LottieBox>
                </SlideSection>
                <ContentBox id="partners">
                    <Partners />
                </ContentBox>
                <FlexBox>
                    <Realtime />
                </FlexBox>
                <ListSection id={"next"} data={data.secondImages} isBot={false} />
                <ContentBox>
                    <Rewards />
                </ContentBox>
                <ContentBox key="table" id="table">
                    <TakeSteps />
                </ContentBox>
                <ContentBox key="video" id="video">
                    <VideoSection />
                </ContentBox>
                <ContentBox id="download_earthmera" key="download">
                    <Download dropb={false} />
                </ContentBox>
            </Wrapper>
        </BgImage>
    )
}
export default AboutEarthmera