import React from 'react'
import styled from 'styled-components';
import { slideInFromTop } from '../../../style';
const isMobile = window.innerWidth < 800;

const Background = styled.div<{ backgroundImage: string }>`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  width: 100%;
  margin-top: 150px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 800px){
    margin-top: 90px;
    height: 700px;
  }
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  
  @media screen and (max-width: 800px){
    padding-left: 5px;
    width: 96%;
  }
`;
const TailText = styled.span`
    position: absolute;
    bottom: 50px;
    left:50%;
    transform: translate(-50%, 0);
    color:#93FF3F ;
    font-size: 1.3rem;
    font-family: 'Fredoka';
    text-align: center;
`;
export default function TicketeerIntro() {
    const data = {
        "bgImage": "Images/ticketeer1bg.png",
        "image" : "Images/ticketeer1Image.png",
        "imageMobile" : "Images/ticketeer1ImageMobile.png",
        "tailText" : "with EarthMera<br />Ticketeer"
    }
  return (
    <Background backgroundImage={data.bgImage}>
        <Image src={isMobile ?"Images/ticketeer1ImageMobile.png" :"Images/ticketeer1Image.png"} />
        <TailText dangerouslySetInnerHTML={{__html: data.tailText}} />
    </Background>
  )
}
