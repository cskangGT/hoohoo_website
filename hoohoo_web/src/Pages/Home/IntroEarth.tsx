import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LinedHeader from '../../components/ContentBox/LinedHeader';
import Slider from '../../components/ContentBox/Slider';
import { theme } from '../../style';
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
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.img`
  width: 90%;
`;

type ColProps = {
  slide: number;
};
const Col = styled.div<ColProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => (props.slide === 2 ? 'row' : 'row-reverse')};
  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;
const IntroText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 50%;
  margin-top: 20px;
  padding-left: 20px;
  @media screen and (max-width: 700px) {
    width: 90%;
    padding: 0;
    flex-direction: column;
    /* margin-bottom: 20rem; */
  }
`;
const FirstDesc = styled.h1`
  text-align: center;
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: ${theme.darkGray};
  font-family: 'Fredoka';
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
  padding: 0 20px;
  height: auto;
  width: 50%;
  padding-left: 10px;
  @media screen and (max-width: 700px) {
    padding: 0;
    width: 80%;
    align-self: center;
  }
`;
const PartnerButton = styled.a`
  font-size: 26px;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.5;
  text-decoration: none;
  border-radius: 30px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  margin: 0.7rem 0;
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  width: 60%;
  text-align: center;
  padding: 12px 30px;
  font-family: 'Fredoka';
  @media screen and (max-width: 1100px) {
    font-size: 22px;
    margin-right: 0;
    margin-top: 20px;
    width: auto;
  }
`;
const Screen = styled.img`
  padding: 0 20px;
  height: auto;
  width: 40%;
  margin-left: 30px;
  @media screen and (max-width: 1100px) {
    width: 60%;
  }
  @media screen and (max-width: 700px) {
    margin-left: 0;
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

const SlideContent: React.FC<{
  imagePath: string;
  data: any;
  windowWidth: number;
  slide: number;
}> = ({imagePath, data, windowWidth, slide}) => {
  return (
    <Slide key={imagePath}>
      {imagePath === 'Images/Banner.png' ? (
        <BannerContainer>
          <LinedHeader data={{header: data[imagePath].firstDesc}} />
          <Banner src={imagePath} draggable="false" />
        </BannerContainer>
      ) : (
        <Col slide={slide}>
          <IntroText>
            <FirstDesc>{data[imagePath].firstDesc}</FirstDesc>
            <SecondDesc
              dangerouslySetInnerHTML={{__html: data[imagePath].secondDesc}}
            />
            <PartnerButton href="/platform#action">
              {data[imagePath].button}
            </PartnerButton>
          </IntroText>
          {imagePath === 'Images/earth.png' ? (
            <LeftImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
          ) : (
            <Screen
              src={imagePath}
              alt="앱 소개 이미지"
              draggable="false"
              style={{maxWidth: windowWidth < 700 ? 'auto' : 350}}
            />
          )}
        </Col>
      )}
    </Slide>
  );
};
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
};

function IntroEarth() {
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
  const data: DataStructure = i18next.t('AboutEarthMera', {
    returnObjects: true,
  });
  const images = Object.keys(data.slides);
  const [isPaused, setIsPaused] = useState(false);

  const handleLeftClick = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    pauseAutoSlide();
  };

  const handleRightClick = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    pauseAutoSlide();
  };

  const pauseAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (!isPaused) {
      slideInterval = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
      }, 5000);
    }
    return () => {
      clearInterval(slideInterval);
    };
  }, [images.length, isPaused]);

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
    <SlideSection id="about">
      <Slider
        currentSlide={currentSlide}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
        pageNumber={images.length}>
        {images.map((imagePath, index) => (
          <SlideContent
            key={index}
            slide={index}
            imagePath={imagePath}
            data={data.slides}
            windowWidth={windowWidth}
          />
        ))}
      </Slider>
    </SlideSection>
  );
}
export default IntroEarth;
