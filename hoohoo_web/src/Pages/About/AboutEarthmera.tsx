import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../style';
import Frame from '../../Component/Frame';
import Wrapper from '../../Component/Wrapper/Wrapper';

const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    @media screen and (max-width: 600px) {
        height: 850px;
    }
`;
const WallPage = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin: 180px 0;
  @media screen and (max-width: 500px) {
        justify-content: center;
        flex-direction: column-reverse;
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
  @media screen and (max-width: 500px) {
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
    @media screen and (max-width: 500px) {
        font-size: 34px;
        margin-bottom: 1rem;
    }
`;

const FirstDesc = styled.h1`
text-align: center;
  font-size: 4.7rem;
  font-weight:600;
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
  @media screen and (max-width: 500px) {
    padding: 0;
      width: 85%;
      align-self: center;
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


interface DataStructure {
    [key: string]: {
        "header": string;
        firstDesc: string;
        secondDesc: string;
    };
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
    const data: DataStructure = {
        "Images/1__.svg": {
            "header": 'EarthMera',
            "firstDesc": "CAPTURE AND BE REWARDED",
            "secondDesc": "CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER."
        },
    }
    const imagePath = Object.keys(data)[0];
    return (
        <BgImage>
            <Wrapper>
                <ContentBox id="about">
                    <WallPage>
                        {windowWidth >= 1100 && imagePath === "Images/1__.svg" &&
                            <LeftImage src="Images/1.svg" alt="앱 소개 이미지" draggable="false" />}
                        <IntroText >
                            <IntroTitle>{data[imagePath]["header"]}</IntroTitle>
                            <FirstDesc>
                                {data[imagePath].firstDesc}
                            </FirstDesc>
                            <SecondDesc dangerouslySetInnerHTML={{ __html: data[imagePath].secondDesc }} />
                        </IntroText>
                        {
                            imagePath === "Images/1__.svg" ? <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" />
                                : <RightImage src={imagePath} alt="앱 소개 이미지" draggable="false" style={{ maxHeight: 800 }} />
                        }
                    </WallPage>
                </ContentBox>
            </Wrapper>
        </BgImage>
    )
}
export default AboutEarthmera