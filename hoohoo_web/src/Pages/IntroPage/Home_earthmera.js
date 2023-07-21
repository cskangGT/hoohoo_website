import React from 'react';
import StoresLink from '../../Component/LinkToStore/LinkToStore.js'
import styled from 'styled-components';
import Nav from '../Nav.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../Component/Footer/Footer.js';
var h = window.innerHeight;
var w = window.innerWidth;
const Header = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding:0;
    display: block;
    margin: -8px;
`;
const BgImage = styled.div`
    background: url("Images/image2.jpg") no-repeat center;
    background-size: cover;
    max-height: 100rem;
    width: ${w}px;
    max-width: 100%;
    height: ${h}px;
`;
const StoresLinkSections = styled.div`
    width: 100rem;
    position: absolute;
    display:block;
    padding-top: 10rem;
    left: 0;
    right: 0;
    box-sizing: border-box;
`;
const StoresLinkBox = styled.div`
    margin-top : 6rem;
    margin-left : 15rem;
    
`;
const PreviewContainer = styled.div`
    width: 25rem;
    display: block;
    position: relative;
    float: left;
    padding-left: 15rem;
    margin-top: -10rem;
`;
const MobileImg = styled.img`
    position: relative;
    height: 30rem;
`;
const SecondPage = styled.div`
    height:50rem;
    max-height: 50rem;
    /* width:100%;
    height:100%;
    max-height: 100rem;
    max-width: 100rem; */
    background-color: #203810;
`;
const Box = styled.div`
padding-top:1vh;
  margin-left: 5vw;
    margin-right: 5vw;
    
`;
const ItemTitle = styled.h3`
  color:#f1f1f1;
  margin-top: 3vh;
  text-align: center;
  font-size: 30px;
`;
// const ContextBox = styled.div`
//     justify-content: center;
//     display: flex;
//     flex-direction: row;
// `;
// const SecondRow = styled.div`
//   display: flex;
//     flex-direction: row;
//     justify-content: center; 
// `;
const ItemBox = styled.div`
  width:70vw;
  height: 40vh;
`;
const Image = styled.img`
  display: block;
  justify-content: center;
  height: 40vh;
  margin-left: 31vw;
`;
const ItemText = styled.p`
    color: #f1f1f1;
    font-size: 25px;
`;

function Steps() {
    const slides = [['Images/preview_earthmera.png', "Take action to save the planet"],
    ['Images/preview_earthmera.png', "Capture green actions with our app"],
    ['Images/preview_earthmera.png', "Our AI-powered detection identifies your green moments"],
    ['Images/preview_earthmera.png', "Earn points by collecting captured eco-actions"],
    ['Images/preview_earthmera.png', "Exchange rewards with your points"]]
    return (
        <Carousel interval={3000}>
            {slides.map((str, index) => (
                <Carousel.Item>
                    <ItemBox>
                <Image
                  src={str[0]}
                  alt="First slide"
                />
                </ItemBox>
                <Carousel.Caption>
                  <ItemText>{str[1]}</ItemText>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            
    </Carousel>
    );
}
function Home_earthmera() {
    
    return (<Header><BgImage>
            <Nav />
            <StoresLinkSections >
                <StoresLinkBox>
                    <StoresLink style={{marginTop:'10rem', marginLeft:'15%'}} logo='Images/Icon_1.png' appName='EARTHMERA' appDesc="Capture your green moment" textColor='#f1f1f1' bg='transparent' ></StoresLink>
                </StoresLinkBox>
                <PreviewContainer>
                    <MobileImg src='Images/preview_earthmera.png'></MobileImg>    
                </PreviewContainer>
            </StoresLinkSections>
        </BgImage>
        <SecondPage>
            <Box>
                <ItemTitle>EarthMera empowers you to make a difference and create a greener future.</ItemTitle>
                <Steps />
            </Box>
        </SecondPage>
        <Footer />
        </Header>);
}
export default Home_earthmera; 