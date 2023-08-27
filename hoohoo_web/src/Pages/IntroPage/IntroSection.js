import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const SectionContainer = styled.section`
//   position: relative;
  display: flex;
    height:940px;

  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
const Inside = styled.div`
  max-width: 1320px;
  
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
}
`;
const IntroText = styled.div`
  display:flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
width: 55%;
`;

const IntroTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 3rem;
  color: ${theme.white};
  font-weight:bold;
`;

const FirstDesc = styled.h1`
  font-size: 5rem;
  font-weight:bold;
  line-height: 1.1;
  margin-bottom: 5rem;
  color: ${theme.white};
`;
const SecondDesc = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 4.5rem;
  line-height: 1.3;
  color: ${theme.white};
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
`;

const IntroSection = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);
    return (<SectionContainer>
        {windowWidth >= 1500 ?
            <Inside>
                <LeftImage src="Images/1.svg" alt="앱 소개 이미지" />
                <IntroText>
                    <IntroTitle>EARTHMERA</IntroTitle>
                    <FirstDesc>
                        CAPTURE AND BE REWARDED
                    </FirstDesc>
                    <SecondDesc>
                        CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER.
                    </SecondDesc>
                </IntroText >
                <RightImage src="Images/1__.svg" alt="앱 소개 이미지" /></Inside>
            : <Inside>
                <IntroText>
                    <IntroTitle>EARTHMERA</IntroTitle>
                    <FirstDesc>
                        CAPTURE AND <br />BE REWARDED
                    </FirstDesc>
                    <SecondDesc>
                        CLICK YOUR SHUTTER,<br />BUILD EARTH'S SHELTER, <br />GET POINTS AND BECOME WEALTHIER.
                    </SecondDesc>
                </IntroText >
                <RightImage src="Images/1__.svg" alt="앱 소개 이미지" />
            </Inside>
        }</SectionContainer >
    );
}

export default IntroSection;