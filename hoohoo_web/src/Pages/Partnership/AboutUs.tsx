import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import PartnerModal from './PartnerModal';
import i18next from 'i18next';
const SectionBox = styled.section`
    padding-bottom: 13rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15rem;
    margin-bottom: 100px;
    @media screen and (max-width: 1100px) {
        padding-top: 5rem;
        padding-bottom: 0rem;
    }
    @media screen and (max-width: 800px) {
        padding-top: 4.5rem;
        padding-bottom: 0rem;
    }
`;
const ContainerBox = styled.div`
  width: calc(100% - 30px);
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
        align-items: center;
        margin-bottom: 30px;
    }
    
`;
const AboutHeader = styled.h4`
    letter-spacing: .1rem;
    text-transform: uppercase;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: .85rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${theme.darkGray};
    @media screen and (max-width: 700px) {
        font-size: 1rem;
    }
`;
const RightCell = styled.div`
 align-items: center;
 display: flex;
 width: 900px;
 height: 600px;
    overflow: visible;
    @media screen and (max-width: 1100px) {
        position: relative;
        top:0;
        left: 40px;
    }
    @media screen and (max-width: 1100px) {
        left: -180px;
        top: 250px;
    }
`;

const AboutUsImage = styled.img`
    position: absolute;
    top: -970px;
    left: -1200px;
    width: 350%;
    height: auto;
    @media screen and (max-width: 1100px) {
            object-fit: scale-down;
        }
`;
const AboutTitle = styled.h1`
    color: ${theme.darkGray};
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.5;
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const AboutContent = styled.p`
    font-size: 1.4rem;
    font-weight: 200;
    line-height: 1.6;
    color: #1b4442;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 1100px) {
    text-align: center;
    }

`;
const PartnerButton = styled.a`
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

function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);
    const data: any = i18next.t('AboutUs', { returnObjects: true });
    const handleOpen = () => setIsOpen(true);
    return (
        <SectionBox>
            <ContainerBox>
                <Grid>
                    <LeftCell>
                        <AboutHeader>{data["header"]}</AboutHeader>
                        <AboutTitle>{data["title"]} </AboutTitle>
                        <AboutContent>{data["content"]}</AboutContent>
                        <PartnerButton onClick={handleOpen}>{data["button"]}</PartnerButton>
                        {isOpen && <PartnerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                    </LeftCell>
                    <RightCell>
                        <AboutUsImage src={data["image"]} />
                    </RightCell>
                </Grid>
            </ContainerBox>
        </SectionBox >)
}
export default AboutUs;