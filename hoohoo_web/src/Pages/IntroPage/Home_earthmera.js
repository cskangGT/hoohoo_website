import React, { useState } from 'react';
import StoresLink from '../../Component/LinkToStore/LinkToStore.js'
import styled from 'styled-components';
import Nav from '../Nav.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { theme } from '../../style.js';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../Component/Footer/Footer.js';
var h = window.outerHeight;
var w = window.outerWidth;
const Header = styled.div`
    width: 100%;
    height: 100%;
    padding:0;
    display: block;
    margin: -8px;
    background-color: ${theme.darkGray};
`;
const BgImage = styled.div`
    // background: url("Images/image2.jpg") no-repeat center;
    background-color: ${theme.darkGray};
    // background-size: cover;
    max-height: 100rem;
    width:100vw;
    // max-width: 100%;
    height: 100vh;
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

const LinktoEmail = styled.button`

  text-decoration: none;
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 20px;
  border-color: ${theme.darkGray};
//   box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  width:200px;
  font-weight: bold;
  margin-bottom: 26px;
  &:hover {
    // background-color: #313131;
    // box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
{/* <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                  Contact Us</LinktoEmail> <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                  문의하기</LinktoEmail> */}
const ContactBox = styled.div`
// height: 200px;
   background-color: ${theme.darkGray};
   display: flex;
   justify-content: center;
`;
const ContactColumnBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const ContactText = styled.h3`
    margin: 26px 0 ;
    font-size: 22px;
  color: ${theme.white};
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
    const [isKorean, setIsKorean] = useState(false);
    return (<Header><BgImage>
        <Nav setIsKorean={setIsKorean} isKorean={isKorean} />
        <StoresLinkSections >
            <StoresLinkBox>
                <StoresLink style={{ marginTop: '10rem', marginLeft: '15%' }} logo='Images/Icon_1.png' appName='EARTHMERA' appDesc="Capture your green moment" textColor='#f1f1f1' bg='transparent' ></StoresLink>
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
        <ContactBox>
            {isKorean ? <ContactColumnBox><ContactText>비즈니스 파트너십 또는 기타 문의사항을 원하시면 아래의 버튼을 클릭하세요.</ContactText>
                <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                    문의하기</LinktoEmail></ContactColumnBox> : <ContactColumnBox><ContactText>Interested in partnering with us or have any questions? </ContactText>
                <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                    Contact Us</LinktoEmail></ContactColumnBox>}

        </ContactBox>
        <hr style={{ color: '#f1f1f1', margin: 0 }} />
        <Footer isKorean={isKorean} />
    </Header>);
}
export default Home_earthmera; 