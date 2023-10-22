import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import Slider from '../../Component/ContentBox/Slider';
import ProfileCard from '../../Component/ContentBox/ProfileCard';
import i18next from 'i18next';
const SectionBox = styled.section`
    padding-bottom: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 5rem;
    justify-content: center;
    margin-top: 100px;
    @media screen and (max-width: 700px) {
        margin-top: 40px;
    }
`;
const ContainerBox = styled.div`
  width: 100%;
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
text-transform: uppercase;
  font-size: 3rem;
  text-align: center;
  font-family: 'Gagalin';
    color: ${theme.darkGray};
    @media screen and (max-width: 700px) {
        font-size: 2rem;
    }
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

function TakeSteps() {
    const data: any = {
        "header": "take it from small steps",
        "image1": "",
        "text1": "out of 6 trillion cigarettes, 450 billion are littered on the streets.",
        "number1": "75%",
        "image2": "",
        "number2": "9%",
        "text2": "of the 460 million tons of plastic produced yearly, 353 million tons become waste, with just 9% being recycled.",
        "image3": "",
        "number3": "80%",
        "text3": "of the 8.6 million tons of marine debris is plastic.",
        "image4": "",
        "number4": "CHANGE",
        "text4": "the numbers speak, it's time for us to act genuinely. Let's make a significant impact on our planet through our app.",
    }
    // i18next.t('teamIntro', { returnObjects: true });


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <SectionBox>
            <ContainerBox>
                <HeaderBox>
                    <HeaderText>
                        {data["header"]}
                    </HeaderText>
                </HeaderBox>
                <React.Fragment>

                </React.Fragment>
            </ContainerBox>
        </SectionBox >)
}
export default TakeSteps;