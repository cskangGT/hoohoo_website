import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import Slider from '../../Component/ContentBox/Slider';
import i18next from 'i18next';

const SectionContainer = styled.section`
    display: flex;
    height:500px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    // margin-top: 82px;
    // margin-bottom: 100px;
    overflow: hidden;
    @media screen and (max-width: 1100px) {
        height: auto;
    }
    @media screen and (max-width: 700px) {
        width: 100%;
        height: 800px;
    }
`;
const Inside = styled.div`
    position: relative;
    max-height: 600px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-left: 15px;
}
@media screen and (max-width: 700px) {
        margin: 0;
        
    }
`;
const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  
`;


const BannerContainer = styled.div`
  width: 100%;
  display: flex;
justify-content: center;
align-items: center;
`;
const Border = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    @media screen and (max-width: 700px) {
        flex-direction : column;
    }
`;
const Banner = styled.img`
    object-position: 50% 50%;
    width: 33%;
    height: 250px;
    background-color: rgba(30,30,30, 0.29);
    object-fit: contain;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    backdrop-filter: blur(15px);
    @media screen and (max-width: 700px) {
        width: 80%;
        height: 180px;
    }
`;

const SlideContent: React.FC<{ imagePaths: string[] }> = ({ imagePaths }) => {

    return (
        <Slide>
            <BannerContainer>
                <Border>
                    {
                        imagePaths.map((imagePath, index) => (<Banner src={imagePath} key={index} />))
                    }
                </Border>
            </BannerContainer>
        </Slide>

    );
};
const Gallary: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slides: string[] = i18next.t('gallery', { returnObjects: true });;
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    const handleRightClick = () => {
        if (currentSlide < groupedImages.length - 1) {
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
    const groupedImages = [];
    for (let i = 0; i < slides.length; i += 3) {
        groupedImages.push(slides.slice(i, i + 3));
    }
    console.log('groupedImages', groupedImages)
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % groupedImages.length);
        }, 5000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [groupedImages.length]);

    return (<SectionContainer>
        <Inside {...handlers} >
            <Slider currentSlide={currentSlide}
                handleLeftClick={handleLeftClick}
                handleRightClick={handleRightClick}
                pageNumber={groupedImages.length} >
                {groupedImages.map((imagePath, index) => (
                    <SlideContent key={index} imagePaths={imagePath} />
                ))}
            </Slider>
        </Inside>
    </SectionContainer >
    );
}

export default Gallary;