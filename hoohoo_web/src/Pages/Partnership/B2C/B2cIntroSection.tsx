import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { HomeTransitionButton } from '../../Home/HomeIntroPage';
import { UpperTitle, HeaderText, ButtonBox } from '../../Home/HomePlatform';
import { Header } from '../../../Component/ContentBox/TwoColBoxesSection';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { theme } from '../../../style';
const Container = styled.section`
width: 100%;
  background-color: transparent;
  height: 900px;
  @media screen and (max-width: 800px){
    height: auto;
  }
`;
const Background = styled.div<{ backgroundImage: string }>`
  width: 100%;
  margin-top: 300px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: row;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 800px){
    height: auto;
    margin-top: 150px;
    
  }
  `;

const InnerContainer = styled.div`
  position: relative;
  flex-direction: row;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 800px){
    height: auto;
    margin-top: 0px;
    flex-direction: column-reverse;
  }
`;
const LeftBox = styled.div`
    padding: 40px 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    @media screen and (max-width: 800px){
        width: 80%;
        padding :30px 0px;
        height: auto;
        align-items: center;
    }
`;
const RightBox = styled.div`
    width: 60%;
    height: 400px;
    position: relative;
    display: flex;
    @media screen and (max-width: 800px){
        height: 250px;
        width: 100%;
    }
`;
const ContentText = styled.p`
  font-size: 1.5rem;
  color: black;
  padding-top: 5px;

`;
const ScreenImage = styled.img`
    position: absolute;
    bottom: -60px;
    height: 550px;
    left: 50%; /* Center horizontally */
  transform: translate(-50%, 0);
    @media screen and (max-width: 800px){
        height: 250px;
        bottom: 0;
    }
`;
export default function B2cIntroSection() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const data ={
        "title": "Reward time for your green daily life!",
        "content" : "Take eco actions, snap photos, check the environmental impact, and earn rewards.",
        "uptitle" : "For EarthMera Users",
        "bgImage" : "Images/platform1bg.jpeg",
        "image" : "Images/platform1Image.png",
        "lineImage": "Images/platform6pline.png",
    }
    
  return (
    <Container>
        <Background backgroundImage={data.bgImage}>
            <Wrapper>
                <InnerContainer>
            <LeftBox>
            <LinedHeader data={{header:data.title, lineImage: data.lineImage}} color={'black'} style={{fontSize: isMobile? '2.5rem': '3.5rem', width: '100%'}}/>
            <ContentText>{data.content}</ContentText>
            </LeftBox>
            <RightBox>
                <ScreenImage src={data.image}></ScreenImage>
            </RightBox>
            </InnerContainer>
            </Wrapper>
        </Background>
    </Container>
  )
}
