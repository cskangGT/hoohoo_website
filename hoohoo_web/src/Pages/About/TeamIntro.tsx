import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import { useSwipeable } from 'react-swipeable';
import Slider from '../../Component/ContentBox/Slider';
import ProfileCard from '../../Component/ContentBox/ProfileCard';
const SectionBox = styled.section`
    padding-bottom: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 5rem;
    max-width: 1260px;
    justify-content: center;
    margin-top: 100px;
`;
const ContainerBox = styled.div`
  width: 100%;
  max-width: 1260px;
  display:flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: all .2s;
    padding: 0 15px;
    overflow: hidden;
`;
const HeaderBox = styled.div`
  width: 100%;
  align-items: center;
`;
const HeaderText = styled.h2`
  font-size: 3rem;
  text-align: center;
color: ${theme.white};
`;
const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1100px) {
      align-items: center;
      justify-content: start;
    flex-direction: column;
    }
`;
interface Profile {
    "photoPath": string;
    "name": string;
    "role": string;
}
interface SlideContentProps {
    array: Profile[];
}

function SlideContent({ array }: SlideContentProps) {

    return (
        <Slide key={array[0].name}>
            {array.map((value, index) => (
                <ProfileCard item={value} />
            ))}
        </Slide>
    );
};

function TeamIntro() {
    const data = [{
        "photoPath": 'Images/profile_photo1.jpeg',
        "name": "Sung Kang",
        "role": "Founder"
    },
    {
        "photoPath": 'Images/profile_photo1.jpeg',
        "name": "Jisan Park",
        "role": "FE Engineer"
    },
    {
        "photoPath": 'Images/profile_photo1.jpeg',
        "name": "Moungsung Im",
        "role": "FE Engineer"
    },
    {
        "photoPath": 'Images/profile_photo1.jpeg',
        "name": "Jimmy Shim",
        "role": "Business Manager"
    }]
    const groupedData = [];
    for (let i = 0; i < data.length; i += 3) {
        groupedData.push(data.slice(i, i + 3));
    }
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const handleLeftClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // 오른쪽 화살표 버튼 클릭 핸들러
    const handleRightClick = () => {
        if (currentSlide < data.length - 1) {
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


    return (
        <SectionBox>
            <ContainerBox>
                <HeaderBox>
                    <HeaderText>
                        Team EarthMera
                    </HeaderText>
                </HeaderBox>

                <div {...handlers}>
                    <Slider
                        currentSlide={currentSlide}
                        handleLeftClick={handleLeftClick}
                        handleRightClick={handleRightClick}
                        pageNumber={groupedData.length}>
                        {groupedData.map((value, index) => (
                            <SlideContent array={value} />
                        ))}

                    </Slider>
                </div>
            </ContainerBox>
        </SectionBox >)
}
export default TeamIntro;