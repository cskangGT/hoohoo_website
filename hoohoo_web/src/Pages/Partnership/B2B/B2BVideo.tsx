import React, { useState } from 'react'
import Wrapper from '../../../Component/Wrapper/Wrapper'
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { theme } from '../../../style';
import PartnerModal from '../PartnerModal';

const Bg = styled.section`
  position: relative; /* Positioned relative to place absolute elements inside */
  width: 100%;
  height: auto; /* Will expand to fit the video */
  overflow: hidden; /* Prevents any overflow from the video */
  
  video {
    width: 100%; /* Will fill the width */
    height: auto; /* Adjust height automatically */
    min-height: 100vh; /* Minimum height to fill screen on desktop */
    object-fit: cover; /* Cover the entire container */
    z-index: -1; /* Ensures video stays behind content */
  }
`; 

const Container  = styled.div`
  position: relative; /* Relative position to place absolute elements */
  margin-bottom: 40px;
  width: calc(100%);
  height: 100vh; /* Minimum height to fill screen */
`;
const Button = styled.button`
  text-decoration: none;
  background-color: #006DFF;
  width: 250px;
  height: 60px;
  font-size: 36px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
  font-family: 'Fredoka';
  color: ${theme.white};
  border-radius: 30px;
  border-color: #006DFF;
  @media screen and (max-width: 700px){
    font-size: 22px;
    }
`;
// Rest of your styles...

export default function B2BVideo() {
    // Your useState and data...
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const data = {
            video: "Images/Earthmera.mp4",
            "header" : "EarthMera <br /> gives you wings.",
            "content" : "ready to make a strong ESG statement?",
            "button" : "Get Started"
          } 
    return (
    <Bg>
        <Wrapper>
          <Container>
            <video autoPlay loop muted playsInline>
              <source src={data.video} type="video/mp4" />
            </video>
            <LinedHeader data={{header: data.header}} style={{position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
                  fontSize: '4.5rem', color: theme.white, zIndex: 10, textAlign:'center' }}/>
            <LinedHeader data={{header: data.content}} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)',
                  fontSize: '2.4rem', color: theme.white, zIndex: 10, textAlign:'center' }}/>
            <Button onClick={()=>{setIsOpen(true)}}>{data.button}</Button>
            {isOpen && <PartnerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
          </Container>
        </Wrapper>
    </Bg>
  )
}