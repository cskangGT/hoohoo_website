import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import PartnerModal from './PartnerModal';
const SectionBox = styled.section`
    padding-bottom: 13rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15rem;
`;
const ContainerBox = styled.div`
  width: 100%;
  max-width: 1140px;
  display:flex;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: all .2s;
    padding: 0 15px;
`;
const Grid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1100px) {
        flex-direction: column-reverse;
    }
`;
const LeftCell = styled.div`
    justify-content:center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 30%;
    margin-bottom: 120px;
    @media screen and (max-width: 1100px) {
        width: 100%;
        margin-top: 40px;
        align-items: center;
    }
    
`;
const AboutHeader = styled.h4`
letter-spacing: .1rem;
text-transform: uppercase;
margin-top: 0.3rem;
margin-bottom: 0.3rem;
font-family: Poppins,sans-serif;
font-size: .85rem;
font-weight: 500;
line-height: 1.5;
color: ${theme.white};
`;
const RightCell = styled.div`
// justify-content: flex-end;
// align-items: center;
// display: flex;
position: absolute;
top: -100px;
`;
const AboutUsImage = styled.img`
  width: 100%;
`;
const AboutTitle = styled.h1`
    color: ${theme.white};
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.5;
`;
const AboutContent = styled.p`
    font-size: 1.4rem;
    font-weight: 200;
    line-height: 1.6;
    color: rgba(180, 255, 250, 1);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    
`;
const PartnerButton = styled.a`
// margin : 20px 5px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 0.75rem;
    background-color: ${theme.mainNeon};
  max-width:60%;
  padding: 10px 15px;
`;
const style: any = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    console.log('isOpen', isOpen)
    return (
        <SectionBox>
            <ContainerBox>
                <Grid>
                    <LeftCell>
                        <AboutHeader>ABOUT US</AboutHeader>
                        <AboutTitle>We're Looking for Eco-Action people. </AboutTitle>
                        <AboutContent>Millions of people engage with EarthMera to verify eco-action and get rewarded while capturing.</AboutContent>
                        <PartnerButton onClick={handleOpen}>Partner with Us</PartnerButton>
                        {isOpen && <PartnerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                    </LeftCell>
                    <RightCell>
                        <AboutUsImage src="Images/partnership.webp" />
                    </RightCell>
                </Grid>
            </ContainerBox>
        </SectionBox >)
}
export default AboutUs;